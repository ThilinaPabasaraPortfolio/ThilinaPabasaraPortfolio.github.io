$(document).ready(function(){
	// Smooth page transition function
	function navigateWithTransition(url) {
		$('.page-transition').addClass('active');
		setTimeout(function() {
			window.location.href = url;
		}, 300);
	}
	
	// Hamburger menu toggle
	$('.menu-toggler').on('click', function(){
		$(this).toggleClass('open');
		$('.top-nav').toggleClass('open');
	});
	
	// Close menu and smooth scroll when navigation link is clicked
	$('.nav-link').on('click', function(e){
		e.preventDefault();
		
		// Close the menu
		$('.menu-toggler').removeClass('open');
		$('.top-nav').removeClass('open');
		
		// Get the target section
		var target = $(this).attr('href');
		
		// Handle home link specifically - always scroll to top
		if(target === 'index.html') {
			$('html, body').animate({
				scrollTop: 0
			}, 800, 'swing');
			return; // Exit early to prevent other handlers
		}
		
		// Only smooth scroll if it's an anchor link (starts with #)
		if(target.startsWith('#') && target !== '#') {
			var targetElement = $(target);
			if(targetElement.length) {
				$('html, body').animate({
					scrollTop: targetElement.offset().top - 80 // 80px offset for better positioning
				}, 800, 'swing');
			}
		}
	});
	
	// Close menu when clicking outside of it
	$(document).on('click', function(e){
		if (!$(e.target).closest('.top-nav, .menu-toggler').length) {
			$('.menu-toggler').removeClass('open');
			$('.top-nav').removeClass('open');
		}
	});
	
	// Scroll to top with easing
	$('.up').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 600, 'swing');
	});
	
	// Page transition for 3D modeling and other page links
	$('.3d-modeling-btn, [href*="3D"], .view-details-3d').on('click', function(e) {
		e.preventDefault();
		const targetUrl = $(this).attr('href') || '3D Modeling.html';
		navigateWithTransition(targetUrl);
	});
	
	// Apply transition to all local HTML page links (EXCEPT index.html)
	$('a[href$=".html"]:not([href="index.html"])').on('click', function(e) {
		const href = $(this).attr('href');
		// Only apply transition to local HTML files, not external links, and not index.html
		if (href && !href.startsWith('http') && !href.startsWith('#')) {
			e.preventDefault();
			navigateWithTransition(href);
		}
	});
	
	// Initialize AOS
	AOS.init({
		easing: 'ease',
		duration: 1800,
		once: true
	});
});