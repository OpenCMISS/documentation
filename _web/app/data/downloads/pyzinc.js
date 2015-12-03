(function(){
	window.pyzinccomponents = {};

	var LinuxInstall = React.createClass({
		render: function(){
			return (
					<div><p><em>Prerequisite</em>: Install the matching OpenCMISS-Zinc library (see above).</p> <ol> <li>Download and install Python 2.6/2.7. PyZinc on Linux is currently available for these two versions of Python only.</li> <li>Download the PyZinc tar.gz archive matching your Python version, above.</li> <li>Untar the tar.gz archive to a temporary directory.</li> <li>Open the command prompt, cd into the temporary directory, and execute the command <code>python setup.py install</code> which installs PyZinc as a Python module.</li> <li>For interactive applications with a Qt user interface, install PySide (or PyQt) along with Qt e.g. using <code>apt-cache search ...</code> / <code>sudo apt-get install ...</code>.</li> </ol> </div>
			);
		}
	});

	var MacInstall = React.createClass({
		render: function(){
			return (<div><p><em>Prerequisite</em>: Install the matching OpenCMISS-Zinc library (see above).</p> <ol> <li>Download and install Python 2.6/2.7. PyZinc on Mac OS X is currently available for these two versions of Python only.</li> <li>Download the PyZinc tar.gz archive matching your Python version, above.</li> <li>Untar the tar.gz archive to a temporary directory.</li> <li>Open the command prompt, cd into the temporary directory, and execute the command <code>python setup.py install</code>, which installs PyZinc as a Python module.</li> <li>For interactive applications with a Qt user interface, install PySide (or PyQt) along with Qt. PySide and Qt for Mavericks and Python2.7 can be found <a href="http://qt-project.org/wiki/PySide_Binaries_MacOSX">here</a>.</li> </ol> </div>);
		}
	});

	var WindowsInstall = React.createClass({
		render: function(){
			return (<div><p><em>Prerequisite</em>: Install the matching OpenCMISS-Zinc library (see above).</p> <ol> <li>Download and install Python 2.7/3.3. PyZinc on Windows is currently available for these two versions of Python only.</li> <li>You may have to add the Python installation directory onto your system PATH.</li> <li>Download the PyZinc Zip archive matching your Python version, above.</li> <li>Unzip the zip archive to a temporary directory.</li> <li>Open the command prompt, cd into the temporary directory, and execute the command <code>python setup.py install</code> (assuming the python executable is on the current path otherwise an absolute path to the python executable is required). This installs PyZinc as a Python module.</li> <li>For interactive applications with a Qt user interface, install PySide or PyQt, which should also install Qt. PySide (recommended) can be found <a href="http://qt-project.org/wiki/PySide_Binaries_Windows">here</a>.</li> </ol> </div>);
		}
	});

	window.pyzinccomponents.INSTRUCTIONS_MAP = {"windows":WindowsInstall,
															 "mac":MacInstall,
													"linux":LinuxInstall};

	window.pyzinccomponents.SourceCodeBox = React.createClass({
		render: function(){
			return (<div className="download-box">
					<h3>Source Code</h3>
		    		<a href="#" target="_blank" className="btn btn-default main">
					<span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>Install from Source</a>
					<a href="https://svn.physiomeproject.org/svn/cmiss/zinc/bindings/" target="_blank" className="btn btn-default">
					<span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span> Browse Source</a>
					</div>);
		}
	});

}());
