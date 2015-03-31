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

	$('.inserted').hover(
		function() {
			$(this).find('.popup').addClass('js-show')
		},
		function() {
			$(this).find('.popup').removeClass('js-show')
		}
	)


	$('.rotate').each( function() {
		var min = Math.min( $(this).height(), $(this).width() )
		var max = Math.max( $(this).height(), $(this).width() )
		$(this).css({ padding: ((max - min) / 2) + 'px 0' })
	})

	$('.rotate').click( function() {
		$(this)
			.toggleClass('no-margin')
			.children()
				.toggleClass('rotate-left')
	})

	$('.inserted').append('<div class="popup">Einfügung Gerardy</div>')

	var pageHeightsAreMatched = false
	$('.nav__button--parallel').click( function() {
		if (pageHeightsAreMatched) {
			resetPageHeights()
		} else {
			matchPageHeights()
		}
		pageHeightsAreMatched = !pageHeightsAreMatched
		$(this).toggleClass('nav__button--highlight')
	})

})

function matchPageHeights() {
	$('.viewer--print .page').each( function(index) {
		var $printPage = $(this)
		var $transcriptPage = $('.viewer--transcript').find('.page').eq(index)
		var height = Math.max( $printPage.height(), $transcriptPage.height() )
		$printPage.add($transcriptPage).css({minHeight: height})
	})
}

function resetPageHeights() {
	$('.viewer .page').css({minHeight: 0})
}
