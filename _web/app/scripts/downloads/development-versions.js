"use strict";
(function(){
	window.devversions = {};

	window.devversions.PLATFORM_NAMES = {
		"windows":"Windows",
		"mac":"OS-X",
		"linux":"Ubuntu"
	};

	function parseVersionString(versionString){
		var parts = versionString.split('r');
		var parsedVersion = {};
		if (parts.length  == 2) {
			parsedVersion.snapshot = parts[1];
		}
		var versionComps = parts[0].split('.');
		parsedVersion.major = versionComps[0];
		parsedVersion.minor = versionComps[1];
		parsedVersion.patch = versionComps[2];
		return parsedVersion;
	}



	function compareVersionString(a,b){
		var parsedA = parseVersionString(a.name),
			parsedB = parseVersionString(b.name);
		return parsedB.snapshot - parsedA.snapshot;
	}

	//FIXME Extract parsing into a function, and add the rest as a mixin


	window.devversions.PyZincDevVersionsList = React.createClass({
		_getNameForFormat: function(architecture,pythonVersion){
			return "for "+pythonVersion + " (" + architecture + ")";
		},
		_parseVersionTree: function(versionTree){
			var versionMap = {};
			for (var formatName in versionTree){
				for (var archName in versionTree[formatName]){
					for (var pythonVersion in versionTree[formatName][archName]) {
						for (var versionNumber in versionTree[formatName][archName][pythonVersion]) {
							var version = versionTree[formatName][archName][pythonVersion][versionNumber];
							var description = this._getNameForFormat(archName,pythonVersion);
							if (versionMap[versionNumber] === undefined){
								versionMap[versionNumber] = [];
							}
							versionMap[versionNumber].push({description: description,
															url: version.url});
						}
					}
				}
			}
			return versionMap;
		},

		buildDownloadList: function(){
			var devVersions = this.props.versions;
			var versionHash = this._parseVersionTree(devVersions);
			var versionList = [];
			for (var versionName in versionHash){
				var version = versionHash[versionName],
					versionLabel = versionName;
				versionList.push({name:versionLabel,downloads:version});
			}
			versionList.sort(compareVersionString);
			return versionList;
		},

		render: function(){

			var downloads = this.buildDownloadList();
			return (
					<div className="versions-list">
					{downloads.map(function(version){
						return (<div><p className="format-list"><DownloadBox name={version.name} downloads={version.downloads} /></p></div>)
					})}
				</div>);

		}
	});


	window.devversions.ZincDevVersionsList = React.createClass({

		_getNameForFormat: function(format,architecture){
			return format + " (" + architecture + ")";
		},

		_parseVersionTree: function(versionTree){
			var versionMap = {};
			for (var formatName in versionTree){
				for (var archName in versionTree[formatName]){
					for (var versionNumber in versionTree[formatName][archName]){
						var version = versionTree[formatName][archName][versionNumber];
						var description = this._getNameForFormat(formatName,archName);
						if (versionMap[versionNumber] === undefined){
							versionMap[versionNumber] = [];
						}
						versionMap[versionNumber].push({description: description,
													url: version.url});
					}
				}
			}
			return versionMap;
		},

		_parseVersionString: function(versionString){
			var parts = versionString.split('r');
			var parsedVersion = {};
			if (parts.length  == 2) {
				parsedVersion.snapshot = parts[1];
			}
			var versionComps = parts[0].split('.');
			parsedVersion.major = versionComps[0];
			parsedVersion.minor = versionComps[1];
			parsedVersion.patch = versionComps[2];
			return parsedVersion;
		},

		_compareVersionStrings: function(a,b){
			var parsedA = this._parseVersionString(a.name),
				parsedB = this._parseVersionString(b.name);
			return parsedB.snapshot - parsedA.snapshot;
		},

		buildDownloadList: function(){
			var devVersions = this.props.versions;
			var versionHash = this._parseVersionTree(devVersions);
			var versionList = [];
			for (var versionName in versionHash){
				var version = versionHash[versionName],
					versionLabel = versionName;
				versionList.push({name:versionLabel,downloads:version});
			}
			versionList.sort(this._compareVersionStrings);
			return versionList;
		},

		render: function(){

			var downloads = this.buildDownloadList();
			return (
					<div className="versions-list">
					{downloads.map(function(version){
						return (<div><p className="format-list"><DownloadBox name={version.name} downloads={version.downloads} /></p></div>)
					})}
				</div>);

		}
	});


}());
