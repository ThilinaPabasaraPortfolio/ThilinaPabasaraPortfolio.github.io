$(document).ready(function(){
	// Hamburger menu toggle
	$('.menu-toggler').on('click', function(){
		$(this).toggleClass('open');
		$('.top-nav').toggleClass('open');
	});

	// Close menu and smooth scroll when navigation link is clicked
	$('.nav-link').on('click', function(e){
		e.preventDefault(); // prevent default link behavior initially

		// Close the menu
		$('.menu-toggler').removeClass('open');
		$('.top-nav').removeClass('open');

		// Get the target href
		var target = $(this).attr('href');

		// Smooth scroll for internal anchors
		if(target.startsWith('#') && target !== '#') {
			var targetElement = $(target);
			if(targetElement.length) {
				$('html, body').animate({
					scrollTop: targetElement.offset().top - 80 // offset for fixed header
				}, 800, 'swing');
			}
		}
		// External pages with page transition
		else if(['index.html', 'Gdesign.html', 'Vediting.html', 'contact.html', '3DModeling.html'].includes(target)) {
			$('.page-transition').addClass('active');
			setTimeout(function() {
				window.location.href = target;
			}, 300);
		}
		// else, if you have any other external links, add handling here if needed
	});

	// Close menu when clicking outside
	$(document).on('click', function(e){
		if (!$(e.target).closest('.top-nav, .menu-toggler').length) {
			$('.menu-toggler').removeClass('open');
			$('.top-nav').removeClass('open');
		}
	});

	// Scroll to top on clicking .up button
	$('.up').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 600, 'swing');
	});

	// Carousel setup
	let currentSlide = 0;
	const slides = $('.carousel-image');
	const totalSlides = slides.length;

	if(totalSlides > 0) {
		slides.eq(0).addClass('active');
	}

	function showSlide(index) {
		slides.removeClass('active');
		slides.eq(index).addClass('active');
		currentSlide = index;
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
		showSlide(currentSlide);
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
		showSlide(currentSlide);
	}

	$('.carousel-next').on('click', function(e) {
		e.preventDefault();
		nextSlide();
	});

	$('.carousel-prev').on('click', function(e) {
		e.preventDefault();
		prevSlide();
	});

	let carouselInterval = setInterval(nextSlide, 5000);

	$('.carousel').on('mouseenter', function() {
		clearInterval(carouselInterval);
	});

	$('.carousel').on('mouseleave', function() {
		carouselInterval = setInterval(nextSlide, 5000);
	});

	// Initialize AOS animations
	AOS.init({
		easing: 'ease',
		duration: 1800,
		once: true
	});
});
