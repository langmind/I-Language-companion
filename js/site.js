// http://stackoverflow.com/questions/16260498/push-footer-to-bottom-when-page-is-not-full 
// set content height on fly 
function autoHeight(){
	$('.main').css('min-height', 0); // clear the main content height 
	$('.main').css('min-height', (   // set the main content height to (document height - (header height + foter height))
		$(document).height() 
		- $('.nav-header').outerHeight()
		- $('.footer').outerHeight()
		));
}

// bind the function on document ready 
$(document).ready(function(){
	autoHeight();
}); 

// bind the function on resize 
$(window).resize(function(){
	autoHeight();
});

