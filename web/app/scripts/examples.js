'use strict';
(function(){
	window.setupSourceArea = function(){
		var editor = ace.edit('comfile');
		editor.setTheme('ace/theme/chrome');
		editor.setReadOnly(true);
		editor.getSession().setUseWrapMode(true);
	};
}());
