/*global $,jQuery,WOW*/
/*jslint node: true */
/*jshint strict:false */

/*    
    Author          : Mohamed Alaa Abas    
    Author Facebook : https://www.facebook.com/SoftTheme-413907182303490/    
**/
'use strict';
$(window).on("load", function () {
    $('.body').fadeOut();
    $('body').removeClass('loading-scroll-hiden');
    new WOW().init();
});
//End Loading
$(function () {
    var AboutPage    = $('#aboutPage'),
        ServicesPage = $('#servicesPage'),
        contactPage  = $('#contactPage'),
        portfolioPage  = $('#portfolioPage'),
        html         = $('html'),
        // Navbar ID
        navId        = $('nav.navbar'),
        //CloseSection
        closeSection    = $('.close-section'),
        closeSectionContent, // Function Close Section
        activeNavBar, // Function To Add Class Active
        selectedClass,// Portfolio 
        NavFilterPortfolio = $(".portfolio-page .nav-filter-portfolio"),// Portfolio 
        FilterPortfolio    = $("#filter-portfolio"),// Portfolio 
        FilterPortfchid    = $("#filter-portfolio .tile"),// Portfolio 
        allListNavBar      = $('.navbar-expand-md .navbar-nav li'),
        PageSliderComing   = $('.home-page .slide-comingsoon'),
        // Nav Button Click In mobile 
        navbarTogglerMob   = $('.navbar-dark .navbar-toggler'),
        navLi              = $("nav .navbar-nav li");
    
    html.smoothScroll(1500); //SmoothScroll .
    /**
     ** Filter Portfolio 
     */
    NavFilterPortfolio.on('click', function () {
        // Active Nav Bar 
        NavFilterPortfolio.removeClass('active');
        $(this).addClass('active');
        // End Active 
        selectedClass = $(this).attr("data-rel"); // Select Attr 
        FilterPortfolio.fadeTo(100, 0.1);
        FilterPortfchid.not("." + selectedClass).fadeOut().removeClass('scale-anm');
        setTimeout(function () {
            $("." + selectedClass).fadeIn().addClass('scale-anm');
            FilterPortfolio.fadeTo(300, 1);
		}, 300);
	});
    // End Filter Portfolio .
    // Magnific Popups . 
    FilterPortfolio.magnificPopup({
		delegate: 'a.magnific-icon',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function (item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});
    /*******************
     ** Move Element 
     ***************/
     $(window).on('scroll', function () {
         var ScrollTop      = $(window).scrollTop(),
             AboutPageT     = $(AboutPage).offset().top - 100,
             ServicesPageT  = $(ServicesPage).offset().top - 100,
             portfolioPageT = $(portfolioPage).offset().top - 100,
             contactPageT   = $(contactPage).offset().top - 100;
         
         if (ScrollTop >= 110) {
             navId.addClass('scroll-block');
         } else {
             navId.removeClass('scroll-block');
         }
         // End Active Nav When Scroll
         if(ScrollTop <= 40){
            // Home Active 
            navLi.removeClass('active');
            $('#navHome').addClass('active');
        }
        if (ScrollTop >= AboutPageT){
            console.log(AboutPageT);
            console.log(ScrollTop);
            // About Active 
            navLi.removeClass('active');
            $('#navAbout').addClass('active');                        
        }
        if(ScrollTop >= ServicesPageT){
            // Portfolio Active 
            navLi.removeClass('active');
            $('#navServices').addClass('active');
        }
        if(ScrollTop >= portfolioPageT){
            // Portfolio Active 
            navLi.removeClass('active');
            $('#navPortfolio').addClass('active');
        }
        if(ScrollTop >= contactPageT){            
            // Contact Active 
            navLi.removeClass('active');
            $('#navContact').addClass('active');
        }      
        // End Active Nav When Scroll
     });
});
