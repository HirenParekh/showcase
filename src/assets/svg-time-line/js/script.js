var arrowWidth = 20;
var bulletPointRadius = 15;

$(document).ready(function () {
	setTimeout(function () {
		var path = $('#time-line-path')[0];
		$('#value-ctrl').bind('input', function (event) {
			addPixel(event.target.value, 100);
		});
		$('.time-line-item').attr('data-arranged', false);
		addEventListeners(path);
		arrangeItemsAsPerBrowserType(path);
	}, 0);
});

function addEventListeners(path) {

	$(window).resize(function () {
		$('.time-line-item').attr('data-arranged', false);
		arrangeItemsAsPerBrowserType(path);
		$('.time-line-item').filter("[data-arranged='false']").removeClass('right-item left-item');
	});
	$(window).scroll(function () {
		arrangeItemsAsPerBrowserType(path);
	});
}

function arrangeItemsAsPerBrowserType(path) {
	arrangeTimeLineItems2();
	/*//Check if browser is IE
	if ($('html').hasClass('ua-ie')) {
	    arrangeTimeLineItems2();
	}
	//Check if browser is Chrome
	else if ($('html').hasClass('ua-chrome')) {
	    arrangeTimeLineItems(path);
	}
	//Check if browser is Firefox
	else if ($('html').hasClass('ua-firefox')) {
	    arrangeTimeLineItems(path);
	}
	//Check if browser is Safari
	else if ($('html').hasClass('ua-safari')) {
	    arrangeTimeLineItems2();
	}
	//Check if browser is Opera
	else if ($('html').hasClass('ua-opera')) {
	    arrangeTimeLineItems2();
	} else {
	    arrangeTimeLineItems2();
	}*/
}

/*function addPixel(x, y) {
    var newPixel = document.createElement('div');
    $(newPixel).css('position', 'fixed');
    $(newPixel).css('height', 2);
    $(newPixel).css('width', 2);
    $(newPixel).css('background', '#ff0000');
    $(newPixel).css('top', y);
    $(newPixel).css('left', x);
    $(newPixel).css('z-index', 4);
    $('.time-line').append(newPixel);
}

function arrangeTimeLineItems(path) {
    var pathLength = Math.round(path.getTotalLength());
    var latestYPoint = 0;
    $('.time-line-item').each(function (index) {
        var currItemYPoint = Math.round(this.getBoundingClientRect().y + $(window).scrollTop());
        for (var i = latestYPoint; i <= pathLength; i = i + 2) {
            var pathYPoint = Math.round(path.getPointAtLength(i).y);
            var newPointDelta = currItemYPoint - pathYPoint;
            if (newPointDelta <= 6 && newPointDelta >= -6) {
                if (index % 2 === 0) {
                    $(this).addClass('right-item');
                    $(this).css('left', (path.getPointAtLength(i + 20 + newPointDelta).x + path.getBoundingClientRect().left + arrowWidth + bulletPointRadius));
                } else {
                    $(this).addClass('left-item');
                    $(this).css('left', (path.getPointAtLength(i + 20 + newPointDelta).x + path.getBoundingClientRect().left - this.getBoundingClientRect().width - arrowWidth - bulletPointRadius));
                }
                latestYPoint = i;
                break;
            }
        }
    });
}*/

function arrangeTimeLineItems2() {
	$('.time-line-item').each(function (index) {
		if (index % 2 === 0) {
			$(this).addClass('right-item');
		} else {
			$(this).addClass('left-item');
		}
	});
	$('.time-line-item').each(function (index) {
		var currTimeLineItemYPoint = this.getBoundingClientRect().top + 20;
		var startPoint = Math.round(($('.time-line').width() / 2) - ($('.time-line-path-container').width() / 2));
		var endPoint = Math.round(($('.time-line').width() / 2) + ($('.time-line-path-container').width() / 2));
		if ($(this).attr('data-arranged') == 'false') {
			for (var i = startPoint; i <= endPoint; i = i + 2) {
				var elementAtPoint = document.elementFromPoint(i, currTimeLineItemYPoint);
				if ($(elementAtPoint).attr('id') === 'time-line-path-ref') {
					$(this).attr('data-arranged', true);
					if (index % 2 === 0) {
						$(this).addClass('right-item');
						$(this).css('left', i + arrowWidth + bulletPointRadius);
					} else {
						$(this).addClass('left-item');
						$(this).css('left', i - this.getBoundingClientRect().width - arrowWidth - bulletPointRadius);
					}
					break;
				}
			}
		}
	});
}
