(function() {

	var _chevronElementStr = '<span class="acc-chevron glyphicon glyphicon-triangle-right" aria-hidden="true"></span>';

	function _hideElement(trigger){
		trigger.find('.acc-chevron').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right');
		trigger.toggleClass('active').next().slideUp(300);
	}

	function _showElement(trigger){
		trigger.toggleClass('active').next().slideDown(300);
		trigger.find('.acc-chevron').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom');
	}

	var $container = $('.acc-container'),
		$trigger   = $('.acc-trigger');

	$container.hide();

	$trigger.prepend(_chevronElementStr);

	var fullWidth = $container.outerWidth(true);

	$trigger.on('click', function(e) {
		var $this = $(this);
		if( $(this).next().is(':hidden') ) {
			_hideElement($trigger);
			_showElement($this);
		} else {
			_hideElement($this);
		}
		e.preventDefault();
	});
})();
