/*!

 =========================================================
 * Paper Dashboard - v1.2.1
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */


var fixedTop = false;
var transparent = true;
var navbar_initialized = false;
var mobile_menu_initialized = false;

$(document).ready(function(){
    window_width = $(window).width();

    // Init navigation toggle for small screens
    if(window_width <= 991){
        pd.initRightMenu();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

});

$(document).on('click', '.navbar-toggle', function(){
  $toggle = $(this);
  if(pd.misc.navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    pd.misc.navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function(){
      $toggle.removeClass('toggled');
    }, 400);
  } else {
    setTimeout(function(){
      $toggle.addClass('toggled');
    }, 430);

    div = '<div id="bodyClick"></div>';
    $(div).appendTo("body").click(function() {
      $('html').removeClass('nav-open');
      pd.misc.navbar_menu_visible = 0;
      $('#bodyClick').remove();
      setTimeout(function(){
        $toggle.removeClass('toggled');
      }, 400);
    });

    $('html').addClass('nav-open');
    pd.misc.navbar_menu_visible = 1;
  }
});

// activate collapse right menu when the windows is resized
$(window).resize(function(){
    if($(window).width() <= 991){
        pd.initRightMenu();
    }
});

pd = {
    misc:{
        navbar_menu_visible: 0
    },
    checkScrollForTransparentNavbar: debounce(function() {
        if($(document).scrollTop() > 381 ) {
            if(transparent) {
                transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                $('.navbar-title').removeClass('hidden');
            }
        } else {
            if( !transparent ) {
                transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
                $('.navbar-title').addClass('hidden');
            }
        }
    }),
    initRightMenu: debounce(function() {
        var $sidebar_wrapper = $('.sidebar-wrapper');
        var $sidebar = $('.sidebar');
    }, 200)
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};