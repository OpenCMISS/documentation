(function(){
	window._setupScrollHideSearch = function(){
		var doc = $(document),
			searchButton = $('#searchButton'),
			searchBar = $('.search-wrapper'),
			markHiddenFn = function(){
				searchBar.addClass('hid');
				//searchButton.removeClass('hid');
			},
			unmarkHiddenFn = function(){
				searchBar.removeClass('hid');
			},
			toggleSearchBar = function(hid){
				if (hid){
					searchBar.slideUp({done: markHiddenFn});
				} else {
					searchBar.slideDown({done: unmarkHiddenFn});
				}
			};

		searchButton.on('click',function(e){
			e.preventDefault();
			if (searchBar.hasClass('hid')){
				toggleSearchBar(false);
				searchBar.addClass('manually-triggered');
			} else {
				toggleSearchBar(true);
				searchBar.removeClass('manually-triggererd');
			}
		});
	}
}());
