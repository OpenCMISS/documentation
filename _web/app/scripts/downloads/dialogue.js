(function(){

		/**
	   <DownloadBox> - represents a download with different formats. For example, one version of the software available either an executable or a compressed archive.
	   @name  - Name of the download.
	   @downloads - The different download formats, expressed as an array of Objects. The Objects should have two properties - description and url.

	*/
	window.DownloadBox = React.createClass({
		getDefaultProps: function(){
			return {highlightMain:  true};
		},

		renderTypeIcon: function(type){
			var glyphiconClass = "glyphicon-download";
			if (type == "link") glyphiconClass = "glyphicon-circle-arrow-right";
			return (<span className={"glyphicon "+glyphiconClass} aria-hidden="true"></span>);
		},

		render: function(){
			var title, self = this;
			if (this.props.name !== undefined && this.props.name !== null ){
				title = (<p className="download-name">{this.props.name}</p>);
			}
			return (
					<div className="download-box">
					{title}
				{this.props.downloads.map(function(download,idx){
					var willHighlight = idx == 0 && self.props.highlightMain; // Checks if the main (first) button should have different styling than others
					return (<a href={download.url} target="_blank" className={"btn btn-default" + (willHighlight ? " main": "")}>{self.renderTypeIcon(download.type)}{download.description}</a>);
				})}
				</div>
			)
	}
    });

	var DetailsTabsEnum = {
		"download":"download",
		"devreleases":"devreleases",
		"source":"source"
	};


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
			var formats = source.formats;
			formats.forEach(function(format){
				format.type = "link";
			});
			if (!source || !source.formats) return this.renderNoSource();
			return (
					<div role="tabpanel" className="tab-pane">
					<p>{source.description}</p>
					<DownloadBox downloads={formats} />
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
			platformChangeHandler: React.PropTypes.func.isRequired,
			routes: React.PropTypes.object.isRequired
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

		goToSourceBox: function(){
			this.context.routes.showDialog(this.props.pkg.id,DetailsTabsEnum.source);
		},

		render: function(){
			var Alert = ReactBootstrap.Alert;
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
					<Alert><em>Want to use {pkg.name} on HPC platforms or set up a development environment?</em> Go to the <a role="button" onClick={this.goToSourceBox}>Source Code tab</a> for options to install or set up from source.</Alert>
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
					<Alert bsStyle="warning"><strong>Here be dragons!</strong> These development versions of {pkg.name} are automatically built from source nightly. They include newer features but may be unstable or may not run. It may be necessary to try multiple versions to get a working version.
</Alert>
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
			developmentVersions: React.PropTypes.object.isRequired,
			routes: React.PropTypes.object.isRequired
		},

		componentDidMount: function(){
			this.setupDialog();
			if (!this.props.currentTab){
				this.setDefaultTab();
			}
		},
/*
		componentWillMount: function(nextProps){
			if (this.props.pkg == undefined || this.props.pkg == null) {
				return;
			}
		},
*/
		componentDidUpdate: function(){
			if (this.props.pkg == undefined || this.props.pkg == null) {
				$(this.refs.dialog).modal('hide');
				return;
			}
			$(this.refs.dialog).modal('show');
			if (!this.props.currentTab){
				this.setDefaultTab();
			}
		},

		setTab: function(tab){
			var pkg = this.props.pkg;
			if (!pkg) return null;
			if (this.context.routes.showDialog){
				this.context.routes.showDialog(pkg.id,tab);
			}
		},

		setDefaultTab: function(){
			// Select release binary tab, but if there are no releases,
			// open source code downloads.
			var pkg = this.props.pkg;
			if (!pkg) return null;
			if (!!pkg.releases){
				this.setTab(DetailsTabsEnum.download);
			} else {
				this.setTab(DetailsTabsEnum.source);
			}
		},

		_dialogCloseHandler: function(closeButton){
			var self = this;
			$(closeButton).click(function(){
				$(self.refs.dialog).modal('hide');
			});
		},

		render: function(){
			const Tabs = ReactBootstrap.Tabs;
			const Tab = ReactBootstrap.Tab;
			var modalContent = null;
			if (this.props.pkg != undefined && this.props.pkg != null) {
				const tabs = (
						<Tabs activeKey={this.props.currentTab}  onSelect={this.setTab}>
						<Tab eventKey={DetailsTabsEnum.download} title="Download"><DownloadTab pkg={this.props.pkg} /></Tab>
						<Tab eventKey={DetailsTabsEnum.devreleases} title="Development Releases"><DevelopmentVersionsTab pkg={this.props.pkg} /></Tab>
						<Tab eventKey={DetailsTabsEnum.source} title="Source Code"><SourceCodeTab pkg={this.props.pkg} /></Tab>
						</Tabs>);

				modalContent = (<div className="modal-content">
								<div className="modal-header">
								<button type="button" className="close" ref={this._dialogCloseHandler} aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
