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

    var DownloadBox = React.createClass({
	render: function(){
	    return (
		<div className="download-box">
		<p className="download-name">{this.props.name}</p>
		{this.props.downloads.map(function(download,idx){

		    return (<a href={download.url} className={"btn btn-default"+ idx == 0 ? " main": ""}>{download.description}</a>);
		})}
		</div>
	    );
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

    var ZincComponent = React.createClass({
	getInitialProps: function(){
	    return ;
	},
	render: function(){
	    return (
		<div>
		<h2>OpenCMISS-Zinc - Visualisation</h2>
		    <p>Zinc is a C++-based package for visualisation, with Python bindings available.</p>
		    <DownloadBox name={this.props.downloads.name} downloads={this.props.downloads.formats} />
		<h3>Python Bindings</h3>
		</div>
	    );
	}
    });


    var IntroComponent = React.createClass({
	render: function(){
	    return (
		<div className="row alert striped">
		<div className="col-sm-2">
		<img src="images/download/opencmiss-stable.png" alt="Logo for OpenCMISS." />
		</div>
		<div className="col-sm-10">
		<h2 className="default-style">Choose the right OpenCMISS package for you.</h2>
		<p><strong>OpenCMISS is currently split into two packages.</strong> Please choose the package most suited for your purpose.</p>
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

	_fetchDownloads: function(){
	    var self = this;
	    return $.ajax('/data/downloads.json').then(function(data){
		var defaultPlatform = self.getPlatformForValue(data.supportedOs,self._detectPlatform() || "linux");
		var newData = $.extend({
		    currentPlatform:defaultPlatform
 		},data);
		return newData;
	    }, function(error){
		console.log("Error occurred while getting downloads data. ",error);
	    });

	},

	_fetchInitialState: function(){
	    this._fetchDownloads().then(function(downloadsData){
		downloadsData
	},

	componentDidMount: function(){
	    this._fetchInitialState();
	},

	render: function(){
	    if (this.state.isLoading){
		return (<p>Loading...</p>);
	    } else {
	    return (
		<div>
		<DownloadsHeader currentPlatform={this.state.currentPlatform}
				platforms={this.state.supportedOs}
				onPlatformChange={this.changePlatform} />
		    <IntroComponent />
		<IronComponent />
		<ZincComponent />
		</div>
	    );
	    }
	}
    });

    ReactDOM.render(<DownloadsPage />,document.getElementById("downloads"));
}());
