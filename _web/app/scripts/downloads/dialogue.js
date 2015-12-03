(function(){

		/**
	   <DownloadBox> - represents a download with different formats. For example, one version of the software available either an executable or a compressed archive.
	   @name  - Name of the download.
	   @downloads - The different download formats, expressed as an array of Objects. The Objects should have two properties - description and url.

	*/
	window.DownloadBox = React.createClass({
		render: function(){
			var title;
			if (this.props.name !== undefined && this.props.name !== null ){
				title = (<p className="download-name">{this.props.name}</p>);
			}
			return (
					<div className="download-box">
					{title}
				{this.props.downloads.map(function(download,idx){
					return (<a href={download.url} className={"btn btn-default" + (idx == 0 ? " main": "")}><span className="glyphicon glyphicon-download" aria-hidden="true"></span>{download.description}</a>);
				})}
				</div>
			)
	}
    });


	var PlatformPicker = React.createClass({

		_onPlatformSelectChange: function(event){
			this.props.onPlatformChange(event.target.value);
		},

		render: function(){
			var platforms = this.props.platforms;
			var selectedPlatform = this.props.currentPlatform;
			return (
					<form name="platformForm" className="platform-form">
					<label htmlFor="platformType">Platform</label>
					<select id="platformType" name="platformType" value={selectedPlatform.value} onChange={this._onPlatformSelectChange}>
					{platforms.map(function(platform,i){
						return <option value={platform.value} key={i}>{platform.label}</option>;
					})}
				</select>
					</form>
			);
		}

	});

	var ConditionalComponent = React.createClass({

		render: function(){
			var test = this.props.test,
				testFn;
			if (typeof test == "object"){
				testFn = function(key) { return test[key] };
			} else if (typeof test == "function") {
				testFn = test;
			}

			return React.createElement(testFn(this.props.value));
		}
	});

	var InstallInstructions = React.createClass({
		render: function(){
			return (<div><h3>Installation Instructions</h3>
					<ConditionalComponent test={this.props.instructionsMap} value={this.props.currentPlatform.value} />
					</div>);
		}
	});

	var SourceCodeTab = React.createClass({
		propTypes: {
			pkg: React.PropTypes.object.isRequired
		},

		renderNoSource: function(){
			return (<div role="tabpanel" className="tab-pane">
					<p>No source code is currently available.</p>
					</div>);
		},

		render: function(){
			const pkg = this.props.pkg;
			if (!pkg) return this.renderNoSource();
			const source = pkg.source;
			if (!source || !source.formats) return this.renderNoSource();
			return (
					<div role="tabpanel" className="tab-pane">
					<p>{source.description}</p>
					<DownloadBox downloads={source.formats} />
					</div>

			);
		}
	});

	var DownloadTab = React.createClass({
		nameForRelease: function(versionName,platform){
			return versionName + ", for " + platform.label;
		},

		contextTypes: {
			currentPlatform: React.PropTypes.object.isRequired,
			platforms: React.PropTypes.array.isRequired,
			platformChangeHandler: React.PropTypes.func.isRequired
		},

		getStableDownload: function(){
			var pkg = this.props.pkg;
			var currentPlatform = this.context.currentPlatform;
			if (!pkg || !pkg.releases || !currentPlatform){	return null; }
			releaseVer = pkg.releases[currentPlatform.value];
			var name = this.nameForRelease(releaseVer.name, currentPlatform);
			return <DownloadBox name={name} downloads={releaseVer.formats} />
		},

		getInstallInstructions: function(){
			var pkg = this.props.pkg;
			if (!pkg) return null;
			var pkgId = pkg.id;
			var platform = this.context.currentPlatform;
			if (!pkgId){ return null; }
			var instructionsMap = window.pkgmeta.INSTRUCTIONS_MAP[pkgId];
			if (!instructionsMap) { return null;}
			return <InstallInstructions instructionsMap={instructionsMap} currentPlatform={platform} />

		},

		renderNoRelease: function(){
			return (<div className="tab-pane" role="tabpanel">
					<p>No stable binary release is currently available.</p>
					</div>);
		},

		render: function(){
			var pkg = this.props.pkg;
			if (!pkg) return this.renderNoRelease();
			var release = pkg.releases;
			if (!release) return this.renderNoRelease();
			var currentPlatform = this.context.currentPlatform,
				stableDownload = this.getStableDownload(),
				installInstructions = this.getInstallInstructions(),
				mainDownload = stableDownload;

			return (<div className="tab-pane" role="tabpanel">
					<PlatformPicker currentPlatform={currentPlatform} platforms={this.context.platforms} onPlatformChange={this.context.platformChangeHandler} />
					{stableDownload}
					{installInstructions}
					</div>
				   );
		}
	});

	var DevelopmentVersionsTab = React.createClass({
		contextTypes: {
			developmentVersions: React.PropTypes.object.isRequired,
			currentPlatform:React.PropTypes.object.isRequired,
			platforms: React.PropTypes.array.isRequired,
			platformChangeHandler: React.PropTypes.func.isRequired
		},

		getPackageDevData: function(){
			const pkg = this.props.pkg;
			var currentPlatform = this.context.currentPlatform;
			if (!pkg || !currentPlatform ) { return null; }
			const pkgId = pkg.id;
			var devVersionsData = this.context.developmentVersions;
			var devVersionsPlatform = window.devversions.PLATFORM_NAMES[currentPlatform.value];
			var devVersionsPkgName = window.pkgmeta.DEV_PKG_NAMES[pkgId];
			if (!devVersionsData || !devVersionsPlatform || !devVersionsPkgName) { return null; }
			var devVersionsByPlatform = devVersionsData[devVersionsPlatform];
			if (!devVersionsByPlatform) { return null;}
			return devVersionsByPlatform[devVersionsPkgName];
		},

		renderNoDevVersions: function(){
			return (
					<div role="tabpanel" className="tab-pane">
					<p>No development release is currently available.</p>
				</div>);
		},

		render: function(){
			var Alert = ReactBootstrap.Alert,
				currentPlatform = this.context.currentPlatform,
				pkg = this.props.pkg;
			if (!pkg ) return this.renderNoDevVersions();
			var packageDevVersions = this.getPackageDevData();
			var devComponent = window.pkgmeta.DEV_VERSIONS_MAP[pkg.id];
			if (!devComponent || !packageDevVersions) { return this.renderNoDevVersions();}
			var devVersionsElement = React.createElement(devComponent,{versions: packageDevVersions});
			return (<div role="tabpanel" className="tab-pane">
					<h3>Development Versions</h3>
					<Alert bsStyle="warning"><strong>Here be dragons!</strong> These development versions of {pkg.name} include newer features but may be unstable or may not run. It may be necessary to try multiple versions to get a working version.</Alert>
					<PlatformPicker currentPlatform={currentPlatform} platforms={this.context.platforms} onPlatformChange={this.context.platformChangeHandler} />
					{devVersionsElement}
					</div>);
		}
	});


	window.PackageDetailsDialogue = React.createClass({

		setupDialog: function(){
			var props = this.props;
			var $dialog = $(this.refs.dialog);
			$dialog.on('hidden.bs.modal', function(){
				props.cancel();
			});
			if (this.props.pkg != undefined && this.props.pkg != null){
				$dialog.modal('show');
			}
		},

		contextTypes:{
			developmentVersions: React.PropTypes.object.isRequired
		},

		componentDidMount: function(){
			this.setupDialog();
		},

		componentDidUpdate: function(){
			if (this.props.pkg == undefined || this.props.pkg == null) {
				$(this.refs.dialog).modal('hide');
				return;
			}
			$(this.refs.dialog).modal('show');
		},

		getTabOrder: function(){
			// Order release binary tab as first page, but if there are no releases,
			// make source code downloads first.

			var pkg = this.props.pkg;
			if (!pkg) return null;
			if (!!pkg.releases){
				return {download: 1,
						devVersions: 2,
						source: 3
					   };
			} else {
				return {source:1,
						download: 2,
						devVersions: 3
					   };

			}
		},

		render: function(){
			const Tabs = ReactBootstrap.Tabs;
			const Tab = ReactBootstrap.Tab;
			const tabOrder = this.getTabOrder();
			var modalContent = null;
			if (this.props.pkg != undefined && this.props.pkg != null) {
				const tabs = (
						<Tabs defaultActiveKey={1}>
						<Tab eventKey={tabOrder.download} title="Download"><DownloadTab pkg={this.props.pkg} /></Tab>
						<Tab eventKey={tabOrder.devVersions} title="Development Releases"><DevelopmentVersionsTab pkg={this.props.pkg} /></Tab>
						<Tab eventKey={tabOrder.source} title="Source Code"><SourceCodeTab pkg={this.props.pkg} /></Tab>
						</Tabs>);

				modalContent = (<div className="modal-content">
								<div className="modal-header">
								<h2 className="default-style">{this.props.pkg.name}</h2>
								<span>{this.props.pkg.description}</span>
								</div>
								<div className="modal-body">
								{tabs}
								</div>
								</div>)
			}

			return (<div className="modal fade" ref="dialog">
					<div className="modal-dialog pkg-dialog">
					{modalContent}
					</div>
					</div>);
		}
	});

})();
