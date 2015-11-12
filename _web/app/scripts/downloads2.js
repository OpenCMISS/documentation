"use strict";
(function(){
    var Util = { filterKey: function(array,key,val) {
	return array.filter(function(element){
	    return element[key] === val;
	});
    },
	first: function(array){
	    if (array.length > 0){
		return array[0];
	    }
	    return null;
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

	var StableReleaseBox = React.createClass({
		render: function(){
			return (<div className="stable-release">
					<h3>Latest Release</h3>
					<div className="release-box">
					{this.props.children}
					</div>
					</div>);
		}
	});

	var DevReleasesComponent = React.createClass({
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
						<devversions.ZincDevVersionsList versions={this.props.development} />
						</div>
						<div className="col-sm-4 source-code sidebar">
						<zinccomponents.SourceCodeBox />
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
			var devVersions = this.props.developmentVersions;
			return (
					<div>
					<h2>OpenCMISS-Zinc - Visualisation</h2>
					<p>Zinc is a C++-based package for visualisation, with Python bindings available.</p>
					<StableReleaseBox>
					<commoncomps.DownloadBox name={this._nameForRelease(release.name)} downloads={release.formats} />
					</StableReleaseBox>
					<DevReleasesComponent development={devVersions} />
					<commoncomps.InstallInstructions instructionsMap={zinccomponents.INSTRUCTIONS_MAP} currentPlatform={this.props.platform.value} />
					</div>
			);
		}
    });

	var PyZincComponent = React.createClass({
		render: function(){
			var release = this.props.release;
			var installInstructions = <commoncomps.InstallInstructions instructionsMap={pyzinccomponents.InstallInstructionsComponents} currentPlatform={this.props.platform.value} />
			return (
					<div>
					<h2>Python Bindings for OpenCMISS-Zinc</h2>
					<p>Bindings for using OpenCMISS-Zinc in Python.</p>
					<commoncomps.DownloadBox name={release.name} downloads={release.formats} />
					{installInstructions}
					</div>
			);
		}
	});


    var IntroComponent = React.createClass({
	render: function(){
	    return (
				<div className="row alert striped">
				<div className="col-sm-10">
				<h2 className="default-style">Choose the right OpenCMISS package for you.</h2>
				<p><strong>OpenCMISS is currently split into two packages.</strong> Please choose the package most suited for your purpose.</p>
				</div>
				<div className="col-sm-2">
				<img src="images/download/opencmiss-stable.png" alt="Logo for OpenCMISS." />
				</div>
				</div>
	    );
	}
    });


    var DownloadsHeader = React.createClass({

	_onPlatformSelectChange: function(event){
	    this.props.onPlatformChange(event.target.value);
	},

	render: function(){
	    var platforms = this.props.platforms;
	    var selectedPlatform = this.props.currentPlatform;
	    return (
		<div>
		<h1>Download OpenCMISS for {selectedPlatform.label}
		<form name="platformForm" className="platform-form">
		<label htmlFor="platformType">Platform</label>
		<select id="platformType" name="platformType" defaultValue={selectedPlatform.value} onChange={this._onPlatformSelectChange}>
		{platforms.map(function(platform,i){
		    return <option value={platform.value} key={i}>{platform.label}</option>;
		})}
		 </select>
		</form>
		</h1>
		</div>
	    );
	}});

    var DownloadsPage = React.createClass({
	getPlatformForValue: function(platforms,value){
	    return Util.first(Util.filterKey(platforms,"value",value));

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
			return {"isLoading":true }
		},

		_loadDownloads: function(){
			var self = this;
			$.ajax('/data/downloads.json').then(function(downloadsData){
				return $.ajax('/data/development_binaries.json').then(function(devBinaries){
					var data = $.extend(downloadsData, devBinaries);
					console.log(data);
					return data;
				}, function(error){
					console.log("Error occurred while getting development binaries. ",error);
				});
			},function(error){
				console.log("Error occurred while getting downloads data. ",error);
			}).then(function(downloadsData){
				var hostPlatform = self._detectPlatform() || "linux",
					defaultPlatform = self.getPlatformForValue(downloadsData.supportedOs,hostPlatform);

				var initialState = $.extend(downloadsData,{"isLoading": false,
														   "currentPlatform":defaultPlatform});
				self.setState(initialState);
			});
		},

		componentDidMount: function(){
			this._loadDownloads();
		},

		render: function(){
			if (this.state.isLoading){
				return (<p>Loading...</p>);
			} else {
				var currPlatform = this.state.currentPlatform.value;
				var currReleases = this.state.releases[currPlatform];
				var currDevReleases = this.state.development_versions[devversions.PLATFORM_NAMES[currPlatform]];
				return (
						<div>
						<DownloadsHeader currentPlatform={this.state.currentPlatform}
					platforms={this.state.supportedOs}
					onPlatformChange={this.changePlatform} />
						<IntroComponent />
						<IronComponent platform={this.state.currentPlatform} release={currReleases} />
						<ZincComponent platform={this.state.currentPlatform} release={currReleases.zinc} developmentVersions={currDevReleases["OpenCMISS-Zinc"]} />
						<PyZincComponent platform={this.state.currentPlatform} release={currReleases.pyzinc} />
						</div>
				);
			}
		}
    });

    ReactDOM.render(<DownloadsPage />,document.getElementById("downloads"));
}());
