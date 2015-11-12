(function(){

	var TOP_MARGIN = 120; // This is the size of the top bar, used to calculate the allowable height for the sidebar.

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
