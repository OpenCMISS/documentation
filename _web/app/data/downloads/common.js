(function(){
	window.pkgmeta = {};

	window.pkgmeta.INSTRUCTIONS_MAP = {
		"pyzinc":pyzinccomponents.INSTRUCTIONS_MAP,
		"zinc":zinccomponents.INSTRUCTIONS_MAP
	};

	window.pkgmeta.DEV_VERSIONS_MAP = {
		"pyzinc":devversions.PyZincDevVersionsList,
		"zinc":devversions.ZincDevVersionsList
	};

	window.pkgmeta.DEV_PKG_NAMES = {
		"zinc":"OpenCMISS-Zinc",
		"pyzinc":"pyzinc"
	};

}());
