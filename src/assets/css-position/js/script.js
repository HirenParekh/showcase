var parallaxSpeed = 0.05;

$(document).ready(function () {

	var Scrollbar = window.Scrollbar;
	$('.parent').css('height', $(window).height());
	setTimeout(function () {
		$('#scrollbar-ref').height(document.getElementById('wrapper').scrollHeight);
		updateChildrenHeight();
		$('body').addClass('ready');
	}, 0);

	$('span').text($('#wrapper').scrollTop() + 'px');

	$(window).on('resize', windowResizeHandler);
	$(window).on('scroll', updateScrollPosition);

});

function updateScrollPosition() {

	$('span').text($('#wrapper').scrollTop() + 'px');
	$('#wrapper').scrollTop($(window).scrollTop());

	$('.parent').each(function () {

		var translateY = ($(this).offset().top - $('#wrapper').scrollTop()) * -1;

		$(this).find('.child').css({
			'transform': 'translate3d(0,' + Math.round(translateY - ($('#wrapper').scrollTop() * parallaxSpeed)) + 'px,0)'
		});
	});
}

function windowResizeHandler() {
	$('.parent').css('height', $(window).height());
	setTimeout(function () {
		$('#scrollbar-ref').height(document.getElementById('wrapper').scrollHeight);
		updateChildrenHeight();
		updateScrollPosition();
	}, 0)
}

function updateChildrenHeight(){
	$('.parent').each(function () {
			var currChild = $(this).find('.child');
			currChild.css('height','100%');
			var currHeight = currChild.height();
			var newHeight = currHeight + ($('#wrapper').prop('scrollHeight') * parallaxSpeed)
			currChild.css('height',newHeight);
		});
}
