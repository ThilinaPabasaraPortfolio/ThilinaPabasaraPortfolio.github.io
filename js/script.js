// Optimized JavaScript with better performance and modern practices
class SiteController {
    constructor() {
        this.isTransitioning = false;
        this.scrollTicking = false;
        this.resizeTimeout = null;
        
        // Cache DOM elements
        this.elements = {
            pageTransition: $('.page-transition'),
            menuToggler: $('.menu-toggler'),
            topNav: $('.top-nav'),
            upButton: $('.up'),
            body: $('html, body')
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initializeAOS();
        this.preloadCriticalImages();
    }
    
    bindEvents() {
        // Use event delegation for better performance
        $(document)
            .on('click', '.menu-toggler', this.toggleMenu.bind(this))
            .on('click', '.nav-link', this.handleNavClick.bind(this))
            .on('click', '.up', this.scrollToTop.bind(this))
            .on('click', this.handleOutsideClick.bind(this));
        
        // Debounced resize handler
        window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
        
        // Page transition handlers
        this.bindPageTransitions();
    }
    
    toggleMenu() {
        this.elements.menuToggler.toggleClass('open');
        this.elements.topNav.toggleClass('open');
    }
    
    handleNavClick(e) {
        e.preventDefault();
        
        const target = $(e.currentTarget).attr('href');
        
        // Close menu
        this.elements.menuToggler.removeClass('open');
        this.elements.topNav.removeClass('open');
        
        // Handle different link types
        if (target === 'index.html') {
            this.smoothScrollTo(0);
        } else if (target?.startsWith('#') && target !== '#') {
            this.smoothScrollToSection(target);
        }
    }
    
    handleOutsideClick(e) {
        if (!$(e.target).closest('.top-nav, .menu-toggler').length) {
            this.elements.menuToggler.removeClass('open');
            this.elements.topNav.removeClass('open');
        }
    }
    
    scrollToTop(e) {
        e.preventDefault();
        this.smoothScrollTo(0);
    }
    
    smoothScrollTo(position, duration = 600) {
        this.elements.body.animate({
            scrollTop: position
        }, duration, 'swing');
    }
    
    smoothScrollToSection(target) {
        const targetElement = $(target);
        if (targetElement.length) {
            const targetPosition = targetElement.offset().top - 80;
            this.smoothScrollTo(targetPosition, 800);
        }
    }
    
    navigateWithTransition(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.elements.pageTransition.addClass('active');
        
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }
    
    bindPageTransitions() {
        // More specific selectors for better performance
        const transitionSelectors = [
            '.3d-modeling-btn',
            '[href*="3D"]',
            '.view-details-3d',
            'a[href$=".html"]:not([href="index.html"])'
        ].join(', ');
        
        $(document).on('click', transitionSelectors, (e) => {
            const href = $(e.currentTarget).attr('href');
            
            // Only apply transition to local HTML files
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                const targetUrl = href || '3D Modeling.html';
                this.navigateWithTransition(targetUrl);
            }
        });
    }
    
    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            AOS.refresh();
        }, 250);
    }
    
    initializeAOS() {
        // Optimized AOS configuration
        AOS.init({
            easing: 'ease-in-out',
            duration: 1000,
            once: true,
            mirror: false,
            anchorPlacement: 'top-bottom',
            offset: 50,
            debounceDelay: 50,
            throttleDelay: 99,
            // Disable on mobile for better performance
            disable: window.innerWidth < 768 ? true : false
        });
    }
    
    preloadCriticalImages() {
        const criticalImages = [
            'images/sitebg.jpg',
            'images/Propic.jpg',
            'images/3D.jpg',
            'images/tn1.png',
            'images/gd1.jpg'
        ];
        
        // Use Promise.all for better async handling
        const imagePromises = criticalImages.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // Don't fail on missing images
                img.src = src;
            });
        });
        
        Promise.all(imagePromises).then(() => {
            console.log('Critical images preloaded');
        });
    }
    
    // Utility method for debugging
    enableAOSDebug() {
        document.addEventListener('aos:in', ({ detail }) => {
            console.log('AOS animated in:', detail);
        });
        
        document.addEventListener('aos:out', ({ detail }) => {
            console.log('AOS animated out:', detail);
        });
    }
}

// Initialize when DOM is ready
$(document).ready(() => {
    const siteController = new SiteController();
    
    // Expose to global scope for debugging if needed
    window.siteController = siteController;
    
    // Enable debug mode in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        siteController.enableAOSDebug();
    }
});

// Fallback for older browsers
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}