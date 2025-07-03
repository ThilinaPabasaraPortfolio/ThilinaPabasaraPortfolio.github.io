$(document).ready(function(){
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
		
		// Only smooth scroll if it's an anchor link (starts with #)
		if(target.startsWith('#') && target !== '#') {
			var targetElement = $(target);
			if(targetElement.length) {
				$('html, body').animate({
					scrollTop: targetElement.offset().top - 80 // 80px offset for better positioning
				}, 800, 'swing');
			}
		} else if(target === 'index.html') {
    // Handle home link with smooth transition
    $('.page-transition').addClass('active');
    setTimeout(function() {
        window.location.href = target;
    }, 300);
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
	
	// Image Carousel functionality
	let currentSlide = 0;
	const slides = $('.carousel-image');
	const totalSlides = slides.length;
	
	// Show first slide initially
	if(totalSlides > 0) {
		slides.eq(0).addClass('active');
	}
	
	// Function to show specific slide
	function showSlide(index) {
		slides.removeClass('active');
		slides.eq(index).addClass('active');
		currentSlide = index;
	}
	
	// Next slide function
	function nextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
		showSlide(currentSlide);
	}
	
	// Previous slide function
	function prevSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
		showSlide(currentSlide);
	}
	
	// Carousel navigation event listeners
	$('.carousel-next').on('click', function(e) {
		e.preventDefault();
		nextSlide();
	});
	
	$('.carousel-prev').on('click', function(e) {
		e.preventDefault();
		prevSlide();
	});
	
	// Auto-advance carousel every 5 seconds
	let carouselInterval = setInterval(nextSlide, 5000);
	
	// Pause auto-advance on hover
	$('.carousel').on('mouseenter', function() {
		clearInterval(carouselInterval);
	});
	
	// Resume auto-advance when mouse leaves
	$('.carousel').on('mouseleave', function() {
		carouselInterval = setInterval(nextSlide, 5000);
	});
	
	// Initialize AOS
	AOS.init({
		easing: 'ease',
		duration: 1800,
		once: true
	});
});