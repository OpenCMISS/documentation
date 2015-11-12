(function(){
	window.commoncomps = {};
	window.commoncomps.ConditionalComponent = React.createClass({

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

	window.commoncomps.InstallInstructions = React.createClass({
		render: function(){
			return (<div><h3>Installation Instructions</h3>
				<commoncomps.ConditionalComponent test={this.props.instructionsMap} value={this.props.currentPlatform} />
					</div>);
		}
	});

	/**
	   <DownloadBox> - represents a download with different formats. For example, one version of the software available either an executable or a compressed archive.
	   @name  - Name of the download.
	   @downloads - The different download formats, expressed as an array of Objects. The Objects should have two properties - description and url.

	*/
	window.commoncomps.DownloadBox = React.createClass({
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


}());
