(function(){

	var TOP_MARGIN = 210;

	function resizeSidebarHeight(){
		var viewportHeight = $(window).height();
		var newSidebarHeight = parseInt(viewportHeight - TOP_MARGIN - 10)+ 'px';
		$("#sidebar").css('max-height',newSidebarHeight);
	}

	$(document).ready(function(){
		resizeSidebarHeight();
		// Throttled calls to resize height to reduce performance problems.
		$(window).bind('resize',throttle(250, resizeSidebarHeight));
	});
}());
