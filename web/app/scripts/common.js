(function(){
	window._setupScrollHideSearch = function(){
		var doc = $(document),
			searchButton = $('#searchButton'),
			searchBar = $('.search-wrapper'),
			markHiddenFn = function(){
				searchBar.addClass('hid');
				//searchButton.removeClass('hidden');
			},
			unmarkHiddenFn = function(){
				searchBar.removeClass('hid');
			},
			toggleSearchBar = function(hide){
				if (hide){
					searchBar.slideUp({done: markHiddenFn});
				} else {
					searchBar.slideDown({done: unmarkHiddenFn});
				}
			},
			handleScroll = function(){
				var top = doc.scrollTop(), barManuallyAdded = searchBar.hasClass('manually-triggered'), barIsHidden = searchBar.hasClass('hid');
				if (top === 0){
					searchButton.addClass('hidden');
					searchBar.removeClass('manually-triggered');
				}
				if ((top !== 0 && barIsHidden|| (top === 0 && !barIsHidden))){
					return;
				}
				if (top !== 0){
					if (barManuallyAdded) return;
					toggleSearchBar(true);
					searchButton.removeClass('hidden');
				} else {
					searchButton.addClass('hidden');
					searchBar.removeClass('manually-triggered');
					toggleSearchBar(false);
				}
			};

		handleScroll();

		doc.on('scroll',handleScroll);

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
