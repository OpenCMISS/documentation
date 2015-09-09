'use strict';
(function(){

	window.detectOs = function(){
		var ua = navigator.userAgent;
		var os = null;
		if (ua.indexOf('Linux') !== -1) { os = 'linux'; }
		if (ua.indexOf('Mac') !== -1) {os = 'mac';}
		if (ua.indexOf('Windows') !== -1) {os = 'windows';}
		return os;
	};

	var selectorEl = '#platformType';
	var downloadListsEl = '.download-list';

	var _setDefaultPlatform = function(){
		window.location.hash = window.detectOs() || 'linux';
	};

	var _changePlatform = function(platform){
		if (platform === undefined || platform === null || platform === '') {
			return;
		}
		var $downloadLists = $(downloadListsEl);
		try {
			var $newList = $downloadLists.filter('.'+platform);
			if ($newList.length > 0){
				$downloadLists.hide();
				$newList.show();
			} else {
				_setDefaultPlatform();
			}
			$(selectorEl).val(platform);
		} catch (e){
			_setDefaultPlatform();
		}
	};

	window.setupDownloads = function(){
		$(window).on('hashchange',function(event){
			_changePlatform(window.location.hash.substring(1));
		});
		$(selectorEl).on('change',function(e){
			window.location.hash = e.target.value;
		});

		$(downloadListsEl).hide();
		if (window.location.hash !== ''){
			_changePlatform(window.location.hash.substring(1));
		} else {
			_setDefaultPlatform();
		}
	};
}());
