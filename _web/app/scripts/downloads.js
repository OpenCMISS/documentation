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


	var PackageBox = React.createClass({
		propTypes: {
			classes: React.PropTypes.array.isRequired,

		},
		render: function(){
		    this.props.classes.push("package-box");
		    var isMain = !!this.props.isMain;
			var iconField = null, icon = this.props.pkg.icon;
			if (icon !== undefined && icon !== null){
				iconField = (<img src={this.props.pkg.icon} alt={"Icon for "+this.props.pkg.name} className="icon" />);
			}
			return (<div className={this.props.classes.join(' ')}>
					<div className="inner">
					{iconField}
					<div className="description">
					<h3>{this.props.pkg.name}</h3>
					<p>{this.props.pkg.description}</p>
				<a href={"#/package/"+this.props.pkg.id} className={"btn btn-default " + (isMain ? "main" : "")}>Get {this.props.pkg.name}</a>
					</div>
					</div>
					</div>);
		}
	});

	var FeaturedPackageBox = React.createClass({
		render: function(){
		    return (<PackageBox pkg={this.props.pkg} classes={["featured-pkg"]} isMain={true} />);
		}
	});

	var PackageGrid = React.createClass({
		_splitPackages: function(packages){
			// Splits packages into rows of two, for presenting on the page.
			var packages = this.props.packages, splitPackages;
			if (packages == undefined || packages == null || !packages.length){
				return [];
			}
			return Util.partition(packages,2);
		},
		render: function(){
			var packages = this._splitPackages(this.props.packages);
			var pkgBoxClasses = ["col-sm-6"];
			var packageComponents = packages.map(function(row){
				var rowPackages = row.map(function(pkg){
					return <PackageBox pkg={pkg} classes={pkgBoxClasses} />;
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

		getFeaturedPackage: function(){
			var featuredPkgId = this.state.featured;
			if (!featuredPkgId) return null;
			return this._packageForId(featuredPkgId);
		},

		getOrdinaryPackages: function(){
			var featuredPkgId = this.state.featured;
			if (!featuredPkgId) return this.state.packages;
			return this.state.packages.filter(function(pkg){
				return pkg.id !== featuredPkgId;
			});
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
						<FeaturedPackageBox pkg={this.getFeaturedPackage()} />
						<h2>Other Downloads</h2>
						<PackageGrid packages={this.getOrdinaryPackages()} />
						<PackageDetailsDialogue pkg={this.state.currentPackage} cancel={this._onDialogueExit} />

						</div>
				);
			}
		}
    });

    ReactDOM.render(<DownloadsPage />,document.getElementById("downloads"));
}());
