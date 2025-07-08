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
		
		// Handle Project Inquiry link - scroll to contact form
		if(target === '#project-inquiry') {
			var targetElement = $('#contact-form');
			if(targetElement.length) {
				$('html, body').animate({
					scrollTop: targetElement.offset().top - 80 // 80px offset for better positioning
				}, 800, 'swing');
			}
		}
		// Only smooth scroll if it's an anchor link (starts with #)
		else if(target.startsWith('#') && target !== '#') {
			var targetElement = $(target);
			if(targetElement.length) {
				$('html, body').animate({
					scrollTop: targetElement.offset().top - 80 // 80px offset for better positioning
				}, 800, 'swing');
			}
		} else if(target === 'index.html' || target === 'Gdesign.html' || target === 'Vediting.html' || target === '3DModeling.html') {
			// Handle external links with smooth transition
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
	
	// FAQ Accordion functionality
$('.faq-question').on('click', function() {
    const $faqItem = $(this).parent('.faq-item');

    // Toggle the 'active' class on the clicked FAQ item
    $faqItem.toggleClass('active');

    // Close other FAQ items by removing the 'active' class
    // This will automatically trigger the CSS transition to collapse them
    $('.faq-item').not($faqItem).removeClass('active');
});
	
	// Form validation and submission
	const $form = $('#contactForm');
	const $submitBtn = $('.submit-btn');
	const $btnText = $('.btn-text');
	const $btnLoader = $('.btn-loader');
	const $formSuccess = $('#formSuccess');
	
	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	// Phone validation regex (flexible format)
	const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
	
	// Form field validation
	function validateField($field) {
		const fieldType = $field.attr('type') || $field.prop('tagName').toLowerCase();
		const fieldValue = $field.val().trim();
		const fieldName = $field.attr('name');
		const $errorMsg = $field.siblings('.error-message');
		let isValid = true;
		let errorText = '';
		
		// Clear previous error
		$field.removeClass('error');
		$errorMsg.text('');
		
		// Check if required field is empty
		if ($field.prop('required') && !fieldValue) {
			isValid = false;
			errorText = 'This field is required.';
		}
		// Email validation
		else if (fieldType === 'email' && fieldValue && !emailRegex.test(fieldValue)) {
			isValid = false;
			errorText = 'Please enter a valid email address.';
		}
		// Phone validation (if provided)
		else if (fieldType === 'tel' && fieldValue && !phoneRegex.test(fieldValue)) {
			isValid = false;
			errorText = 'Please enter a valid phone number.';
		}
		// Name validation
		else if (fieldName === 'name' && fieldValue && fieldValue.length < 2) {
			isValid = false;
			errorText = 'Name must be at least 2 characters long.';
		}
		// Message validation
		else if (fieldName === 'message' && fieldValue && fieldValue.length < 10) {
			isValid = false;
			errorText = 'Please provide more details about your project (at least 10 characters).';
		}
		
		if (!isValid) {
			$field.addClass('error');
			$errorMsg.text(errorText);
		}
		
		return isValid;
	}
	
	// Real-time validation
	$form.find('input, select, textarea').on('blur', function() {
		validateField($(this));
	});
	
	// Clear error on focus
	$form.find('input, select, textarea').on('focus', function() {
		$(this).removeClass('error');
		$(this).siblings('.error-message').text('');
	});
	
	// Form submission
	$form.on('submit', function(e) {
		e.preventDefault();
		
		let isFormValid = true;
		
		// Validate all fields
		$form.find('input[required], select[required], textarea[required]').each(function() {
			if (!validateField($(this))) {
				isFormValid = false;
			}
		});
		
		// Validate optional fields that have content
		$form.find('input:not([required]), select:not([required]), textarea:not([required])').each(function() {
			if ($(this).val().trim()) {
				validateField($(this));
			}
		});
		
		if (!isFormValid) {
			// Scroll to first error
			const $firstError = $form.find('.error').first();
			if ($firstError.length) {
				$('html, body').animate({
					scrollTop: $firstError.offset().top - 100
				}, 500);
			}
			return;
		}
		
		// Show loading state
		$submitBtn.addClass('loading');
		$btnText.text('Sending...');
		$btnLoader.show();
		
		// Simulate form submission (replace with actual submission logic)
		setTimeout(function() {
			// Hide loading state
			$submitBtn.removeClass('loading');
			$btnText.text('Send Message');
			$btnLoader.hide();
			
			// Show success message
			$form.fadeOut(300, function() {
				$formSuccess.fadeIn(300);
			});
			
			// Reset form after showing success
			setTimeout(function() {
				$form[0].reset();
				$formSuccess.fadeOut(300, function() {
					$form.fadeIn(300);
				});
			}, 3000);
			
		}, 2000); // Simulate 2 second processing time
	});
	
	// Smooth scrolling for anchor links in contact methods
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		const target = $(this).attr('href');
		if (target !== '#' && $(target).length) {
			$('html, body').animate({
				scrollTop: $(target).offset().top - 80
			}, 800, 'swing');
		}
	});
	
	// Add click-to-copy functionality for contact information
	$('.contact-method p a').on('click', function(e) {
		const href = $(this).attr('href');
		
		// Handle phone numbers
		if (href.startsWith('tel:')) {
			e.preventDefault();
			const phoneNumber = $(this).text();
			
			// Try to copy to clipboard
			if (navigator.clipboard) {
				navigator.clipboard.writeText(phoneNumber).then(function() {
					showCopyToast('Phone number copied to clipboard!');
				}).catch(function() {
					// Fallback: just show the number
					showCopyToast('Phone: ' + phoneNumber);
				});
			} else {
				showCopyToast('Phone: ' + phoneNumber);
			}
		}
		
		// Handle email addresses
		if (href.startsWith('mailto:')) {
			const email = $(this).text();
			
			// Try to copy to clipboard
			if (navigator.clipboard) {
				navigator.clipboard.writeText(email).then(function() {
					showCopyToast('Email address copied to clipboard!');
				}).catch(function() {
					// Allow default mailto behavior
				});
			}
		}
	});
	
	// Toast notification function
	function showCopyToast(message) {
		// Remove existing toast if any
		$('.copy-toast').remove();
		
		// Create toast element
		const $toast = $('<div class="copy-toast">' + message + '</div>');
		
		// Add to body
		$('body').append($toast);
		
		// Show toast
		setTimeout(function() {
			$toast.addClass('show');
		}, 100);
		
		// Hide toast after 3 seconds
		setTimeout(function() {
			$toast.removeClass('show');
			setTimeout(function() {
				$toast.remove();
			}, 300);
		}, 3000);
	}
	
	// Initialize AOS
	AOS.init({
		easing: 'ease',
		duration: 1800,
		once: true
	});
});