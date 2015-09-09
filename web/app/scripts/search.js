(function(){

	var _searchElementSetup = function(){
		var searchElement = google.search.cse.element.render({
			div:'search-form',
			tag:'searchresults-only',
			attributes:{autoSearchOnLoad:false}
		});
		var $searchForm = $('#search-form');
		$searchForm.on('submit',function(e){
			e.preventDefault();
			searchElement.execute($searchForm.find('input').val());
		});
	}

	var gcsCallback = function(){
		if (document.readyState == 'complete'){
			_searchElementSetup();
		} else {
			google.setOnLoadCallback(function(){
				_searchElementSetup();
			}, true);
		}
	};

	window.__gcse = {
		parsetags: 'explicit',
		callback: gcsCallback
	};
}());

(function() {
  var cx = '008007135417019367495:caxgodc2wem';
  var gcse = document.createElement('script'); gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
      '//cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
})();
