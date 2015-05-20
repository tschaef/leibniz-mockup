$(function() {

	$('.js-toggle-nav').click( function() {
		$('body').toggleClass('-nav-open')
	})

	var buttonTitleTimeout
	$('.popup').parent('a, button').hover(
		function() {
			var $title = $(this).find('.popup')
			buttonTitleTimeout = setTimeout( function() {
				$title.addClass('-visible')
			}, 400)
		},
		function() {
			var $title = $(this).find('.popup')
			clearTimeout(buttonTitleTimeout)
			$title.removeClass('-visible')
		}
	)

	$('.nav_button.-minimize').click( function() {
		$(this).parents('.pane').addClass('-minimized')
	})

	$('.nav_button.-restore').click( function() {
		$(this).parents('.pane').removeClass('-minimized')
	})

	// Handle footnotes
	var prevHeight,
		prevOffsetTop
	$('.viewer.-transcript .afootnote').each( function(index) {
		$this = $(this)
		$footnote = $(this).clone()
		$this.html('<span class="footnote-marker"></span>')
		offsetTop = $this.position().top - 4 - 12
		$('.viewer.-info .content').append($footnote)
		if ( index > 0 ) {
			while ( offsetTop < prevHeight + prevOffsetTop ) {
				offsetTop += parseInt( $this.css('line-height') )
			}
		}
		$footnote.css('top', offsetTop + 'px')
		prevHeight = $footnote.height()
		prevOffsetTop = offsetTop
	})

	// Demo variants
	$('.demo-variant-info.-a').css('top', $('.demo-variant.-a').position().top)
	$('.demo-variant-info.-b').css('top', $('.demo-variant.-b').position().top)

	$('.header_cite-link').click( function() {
		$('.popup.-cite').toggleClass('-visible')
		$('.popup.-cite .popup_input').focus()
		return false
	})

	$('.popup.-cite .popup_input').focus( function() {
		$(this).select()
	})

	$(window).scroll( function() {
		$('body').toggleClass('-scrolled', $(window).scrollTop() > 0)
	})

	$('body').click( function() {
		$('.popup.-cite').removeClass('-visible')
	})

	$('.popup.-cite').click( function() {
		return false
	})

})
