/* Script for finding links that are currently going to Under Construction, and label them as such.
   Remove when all pages have been created.
*/

(function(){
	$(document).ready(function(){
		var ucRegExp = new RegExp('/underconstruction.html');
		var ucLinks = $('a').filter(function(i,anchor){
			return ucRegExp.test($(anchor).attr('href'))
		});
		console.log("Debug: found "+ucLinks.length+" under construction page(s).");
		ucLinks.each(function(i,link){
			var $link = $(link);
			$link.attr('title','This page is still under construction.');
			var $linkText  = $(link).find('p');
			if ($linkText.length > 0){
				$($linkText[0]).append('<span class="glyphicon glyphicon-thumbs-down" style="font-size:12px;padding-left:5px;"></span>');
			}
		});
	});
}());
