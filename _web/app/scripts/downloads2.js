"use strict";
(function(){
    var Util = { filterKey: function(array,key,val) {
		return array.filter(function(element){
			return element[key] === val;
		});
    },
				 partition: function(items, size) {
					 var result = _.groupBy(items, function(item, i) {
						 return Math.floor(i/size);
					 });
					 return _.values(result);
				 }
			   };

	var VersionsList = React.createClass({
		render: function(){
			return (
					<div className="versions-list">
					{this.props.versions.map(function(version){
						return (<div><p className="format-list"><commoncomps.DownloadBox name={version.name} downloads={version.formats} /></p></div>)
					})}
					</div>);
		}
	});

    var IronComponent = React.createClass({
	render: function(){
	    return (
		<div>
		<h2>OpenCMISS-Iron - Computation</h2>
		<p>Iron is a Fortran-based package for computation.</p>
		</div>
	    );
	}
    });

	/**
	   <DevReleasesComponent> - a presentational component for showing development releases and source code.

	 */

	var DevReleasesBox = React.createClass({
		getInitialState: function(){
			return {"showing": false};
		},
		_toggleShow: function(){
			this.setState({'showing':!this.state.showing});
		},
		render: function(){
			var devVersionLabel;
			if (this.state.showing){
				return (<div className="dev-release">
						<a role="button" onClick={this._toggleShow}>Hide development versions and source code options...</a>
						{devVersionLabel}
						<div className="row row-content extras infobox striped">
						<div className="col-sm-8">
						<h3>Development Versions</h3>
						<div className="alert alert-info"><strong>May contain traces of nuts!</strong> These development versions of OpenCMISS-Zinc include newer features but may be unstable or may not run. It may be necessary to try multiple versions to get a working version.</div>
						{this.props.development}
						</div>
						<div className="col-sm-4 source-code sidebar">
						{this.props.source}
						</div>
						</div>
						</div>
					   );

			} else {
				return (<div className="dev-release"><a role="button" onClick={this._toggleShow}>Show development versions and source code options...</a></div>);
			}

		}
	});

    var ZincComponent = React.createClass({
		_nameForRelease: function(name){
			return name + ", for " + this.props.platform.label;
		},
		render: function(){
			var release = this.props.release;
			var devVersionsList = (<devversions.ZincDevVersionsList versions={this.props.developmentVersions} />);
			var sourceBox = (<zinccomponents.SourceCodeBox />);

			return (
					<div>
					<h2>OpenCMISS-Zinc - Visualisation</h2>
					<p>Zinc is a C++-based package for visualisation, with Python bindings available.</p>
					<StableReleaseBox>
					<commoncomps.DownloadBox name={this._nameForRelease(release.name)} downloads={release.formats} />
					</StableReleaseBox>
					<DevReleasesBox development={devVersionsList} source={sourceBox} />
					<commoncomps.InstallInstructions instructionsMap={zinccomponents.INSTRUCTIONS_MAP} currentPlatform={this.props.platform.value} />
					</div>
			);
		}
    });

	var PyZincComponent = React.createClass({
		render: function(){
			var release = this.props.release;
			var devList = (<devversions.PyZincDevVersionsList versions={this.props.developmentVersions} />);
			var installInstructions = (<commoncomps.InstallInstructions instructionsMap={pyzinccomponents.INSTALL_INSTRUCTIONS} currentPlatform={this.props.platform.value} />);
			var source = (<pyzinccomponents.SourceCodeBox />);
			return (
					<div>
					<h2>Python Bindings for OpenCMISS-Zinc</h2>
					<p>Bindings for using OpenCMISS-Zinc in Python.</p>
					<StableReleaseBox>
					<commoncomps.DownloadBox name={release.name} downloads={release.formats} />
					</StableReleaseBox>
					<DevReleasesBox development={devList} source={source} />
					{installInstructions}
					</div>
			);
		}
	});

	var PackageBox = React.createClass({
		render: function(){
			var iconField = null, icon = this.props.package.icon;
			if (icon !== undefined && icon !== null){
				iconField = (<img src={this.props.package.icon} alt={"Icon for "+this.props.package.name} className="icon" />);
			}
			return (<div className="package-box col-sm-6 media-item">
					<div className="inner">
					{iconField}
					<div className="description">
					<h3>{this.props.package.name}</h3>
					<p>{this.props.package.description}</p>
					<a href={"#/package/"+this.props.package.id} className="btn btn-default">Get {this.props.package.name}</a>
					</div>
					</div>
					</div>);
		}
	});

	var PackageGrid = React.createClass({
		_splitPackages: function(packages){
			var packages = this.props.packages, splitPackages;
			if (packages == undefined || packages == null || !packages.length){
				return [];
			}
			return Util.partition(packages,2);
		},
		render: function(){
			var packages = this._splitPackages(this.props.packages);
			var packageComponents = packages.map(function(row){
				var rowPackages = row.map(function(pkg){
					return <PackageBox package={pkg} />;
				});
				return (<div className="row row-content">
						{rowPackages}
						</div>);
			});
			return (<div className="package-grid">
					{packageComponents}
					</div>);
		}
	});



    var DownloadsPage = React.createClass({
		// Director router
		router: null,
	getPlatformForValue: function(platforms,value){
	    return _.first(Util.filterKey(platforms,"value",value));

	},
	_detectPlatform: function(){
		var ua = navigator.userAgent;
		var os = null;
		if (ua.indexOf('Linux') !== -1) { os = 'linux'; }
		if (ua.indexOf('Mac') !== -1) {os = 'mac';}
		if (ua.indexOf('Windows') !== -1) {os = 'windows';}
		return os;
	},

	changePlatform: function(platformVal){
	    var platform = this.getPlatformForValue(this.state.supportedOs,platformVal);
	    if (platform != null){
		this.setState({'currentPlatform':platform});
	    }
	},

		getInitialState: function(){
			return {"isLoading":true, "currentPackage":null, packages: null }
		},

		_loadInitialState: function(){
			var self = this;
			return $.ajax('/data/downloads.json').then(function(downloadsData){
				return $.ajax('/data/development_versions.json').then(function(devBinaries){
					var data = $.extend(downloadsData, devBinaries);
					console.log(data);
					return data;
				}, function(error){
					console.error("Error occurred while getting development binaries. ",error);
				});
			},function(error){
				console.error("Error occurred while getting downloads data. ",error);
			}).then(function(downloadsData){
				var hostPlatform = self._detectPlatform() || "linux",
					defaultPlatform = self.getPlatformForValue(downloadsData.supportedOs,hostPlatform);
				return $.extend(downloadsData,{"isLoading": false,
														   "currentPlatform":defaultPlatform});
			});
		},

		_packageForId: function(id){
			var matchedPackages = this.state.packages.filter(function(pkg){
				return pkg.id === id;
			});
			if (matchedPackages.length == 0){
				return null;
			}
			return matchedPackages[0];
		},

		_initialiseRoutes: function(){
			var self = this;
			var router = this.router = new Router().configure({
				notfound: function(){
					router.setRoute('/');
				}
			});
			router.on('/',function(){
				self.setState({
					currentPackage:null
				});
			});
			router.path("/package/",function(){
				this.on('/:pkgId/',function(pkgId){
					// TODO need to also redirect :pkgId/!

					self.setState({
						currentPackage:self._packageForId(pkgId)
					});
				});

				this.on('/:pkgId/:tab', function(pkgId, tab){
				});
			});
		},

		_onDialogueExit: function(){
			this.router.setRoute('/');
		},

		componentDidMount: function(){
			var self = this;
			this._loadInitialState().then(function(initialState){
				self.setState(initialState);
				self.router.init();
			});
			this._initialiseRoutes();
		},

		getChildContext: function(){
			return { developmentVersions: this.state.development_versions || {},
					 currentPlatform: this.state.currentPlatform || {},
					 platforms: this.state.supportedOs || [],
					 platformChangeHandler: this.changePlatform || function(){}};
		},

		childContextTypes: {
			currentPlatform: React.PropTypes.object.isRequired,
			platforms: React.PropTypes.array.isRequired,
			platformChangeHandler: React.PropTypes.func.isRequired,
			developmentVersions: React.PropTypes.object.isRequired
		},

		render: function(){
			if (this.state.isLoading){
				return (<p>Loading...</p>);
			} else {
				var currPlatform = this.state.currentPlatform.value;
				return (
						<div>
						<h1>Get OpenCMISS</h1>
						<p>Choose the right package for your use.</p>
						<PackageGrid packages={this.state.packages} />
						<PackageDetailsDialogue pkg={this.state.currentPackage} cancel={this._onDialogueExit} />

						</div>
				);
			}
		}
    });

    ReactDOM.render(<DownloadsPage />,document.getElementById("downloads"));
}());
