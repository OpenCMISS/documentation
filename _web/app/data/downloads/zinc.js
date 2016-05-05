(function(){
    window.zinccomponents = {};

    var WindowsInstall = React.createClass({
	render: function(){
	    return (<ol>
		    <li><p>
		    Download either the above installer (preferred) or zip archive.
		    </p></li>
		<li><p>For the installer, run the exe; an install wizard will pop up, follow the steps and select ‘Add OpenCMISS-Zinc to the system PATH for all users’ (or add it manually for a single user as described below). For the zip archive, extract the contents of the archive where you want Zinc installed, and add its bin folder to the PATH environment variable for the current user (In Windows 7 this is under Control Panel|User Accounts|Change my environment variables).</p></li>
		<li><p>Microsoft Visual C++ Redistributable is also required for 64-bit Windows. It can be downloaded and installed from the following <a href="http://search.microsoft.com/en-us/DownloadResults.aspx?q=Microsoft+Visual+C%2b%2b+2010+SP1+Redistributable+Package">Microsoft page</a>.</p></li></ol>);
	}
    });

    var MacInstall = React.createClass({
	render: function(){
	    return (
		<ol> <li><p>Download either the above dmg installer (preferred) or tar.gz archive.</p></li> <li><p>The dmg package will install the libZinc binaries into /usr/local/lib and the system should now be able to locate the libZinc library. For the tar.gz archive: manually extract to the desired installation location and add location to system path.</p></li> </ol>)
	}
    });

    var LinuxInstall = React.createClass({
	render: function(){
	    return (
		<ol> <li>Download either the debian package (preferred) or tar.gz archive.</li> <li>The debian package can be installed with the following command line: <code>sudo dpkg -i OpenCMISS-Zinc*.deb</code>.</li> <li>After installation, run <code>sudo ldconfig</code> to update the libraries database.</li> </ol>);
	}
    });

    window.zinccomponents.SourceCodeBox = React.createClass({
	render: function(){
	    return (<div className="download-box">
		    <h3>Source Code</h3>
		    		<a href="#" target="_blank" className="btn btn-default main">
		<span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>Install from Source</a>
		<a href="https://svn.physiomeproject.org/svn/cmiss/zinc/library/" target="_blank" className="btn btn-default">
		<span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span> Browse Source</a>
		</div>);
	}
    });

    window.zinccomponents.INSTRUCTIONS_MAP = {"windows":WindowsInstall,
	    "mac":MacInstall,
	    "linux":LinuxInstall};
}());
