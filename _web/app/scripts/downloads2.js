"use strict";
(function(){
	var DownloadsHeader = React.createClass({
		render: function(){
			return <div><h1>Download OpenCMISS for {this.props.os}</h1>
				<form name="platformForm" class="platform-form">
				<label for="platformType">Platform</label>
				<select id="platformType" name="platformType">
				<option value="windows">Windows</option>
				<option value="mac">Mac OS X</option>
				<option value="linux">Linux</option>
				</select>
				</form>
				</div>;
		}
	});

	var DownloadsPage = React.createClass({
		render: function(){
			return <DownloadsHeader></DownloadsHeader>;
		}
	});

	ReactDOM.render(<DownloadsPage></DownloadsPage>,document.getElementById("downloads"));
}());
