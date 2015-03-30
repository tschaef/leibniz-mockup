$(function() {

	$('.js-toggle-nav').click( function() {
		$('body').toggleClass('js-nav-open')
	})

	var buttonTitleTimeout
	$('.nav__button').hover(
		function() {
			var $title = $(this).find('.nav__button-title')
			buttonTitleTimeout = setTimeout( function() {
				$title.addClass('js-show')
			}, 600)
		},
		function() {
			var $title = $(this).find('.nav__button-title')
			clearTimeout(buttonTitleTimeout)
			$title.removeClass('js-show')
		}
	)

})
