$(document).ready(function () {
    cards.initialize();
    var cardContainer = $(".card-container");
    var deckOfCards = cards.getDeckOfCards();
    var numOfCards = deckOfCards.length;
    var gap = 20;
    addDeckOfCards();
    //add a dack of card to view
    $("#deckOfCard").click(addDeckOfCards);

    function addDeckOfCards() {
        deckOfCards = cards.getDeckOfCards();
        numOfCards = deckOfCards.length;
        deckOfCards.forEach(function (card) {
            cards.addCard(card, cardContainer);
            var zIndex = $(card.getCardElement()).css("z-index");

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var topOffSet = getRandomInt(100, 200);
            var leftOffSet = getRandomInt(100, 200);
            var random = 0;
            while (random == 0) {
                random = getRandomInt(-1, 1);
            }
            $(card.getCardElement()).css({
                top: (topOffSet * random) + '%',
                left: (leftOffSet * random * random) + '%',
                visibility: 'hidden'
            });
            setTimeout(function () {
                $(card.getCardElement()).animate({
                        top: ((numOfCards - zIndex) * 0.5) + 20,
                        left: ((numOfCards - zIndex) * 0.5) + 20
                    },
                    {
                        start: function () {
                            $(card.getCardElement()).css({
                                visibility: 'visible'
                            })
                        },
                        duration: 700
                    });
            }, ( (zIndex) * 25 ));
        });
    }

    cardContainer.addClass("stacked");
    $("#shuffleCard").click(function () {
        deckOfCards = shuffle(deckOfCards);
        cardZIndex = 1;

        deckOfCards.forEach(function (card) {
            card.setZIndex(cardZIndex++);
        });

        // gridCards();
        var row = 0;
        var col = 0;
        var margin = 20;
        var cardWidth = 160;
        var cardHeight = 240;
        var parentWidth = cardContainer.width();
        var parentHeight;
        deckOfCards.forEach(function (card) {
            var cardElem = card.getCardElement();
            var zIndex = $(cardElem).css("z-index");
            var leftOffset = (cardWidth * col) + (margin * (col + 1));

            if ((leftOffset + cardWidth) > parentWidth) {
                col = 0;
                row++;
            }
            leftOffset = (cardWidth * col) + (margin * (col + 1));
            var topOffset = (cardHeight * row) + (margin * (row + 1));

            $(cardElem).stop();

            $(cardElem).animate({
                top: topOffset,
                left: leftOffset
            }, (800 + (zIndex * 5) ), 'easeOutCirc');


            parentHeight = topOffset + cardHeight + margin;
            col++;
        });
        cardContainer.animate({
            height: parentHeight
        }, 1000, 'easeOutCirc');
        cardContainer.removeClass("stacked");
    });


    $("#stacknshuffleCard").click(function () {
        //stackedCards();
        deckOfCards = shuffle(deckOfCards);
        var cardZIndex = 1;
        deckOfCards.forEach(function (card) {
            card.setZIndex(cardZIndex++)
        });
        deckOfCards.forEach(function (card) {
            var zIndex = $(card.getCardElement()).css("z-index");
            $(card.getCardElement()).stop();

            var direction = ((zIndex % 2) === 0) ? 1 : -1;
            $(card.getCardElement()).animate({
                left: (150 * direction),
                top: gap
            }, {
                duration: (500 + (zIndex * 5)),
                easing: 'easeOutBack',
                always: animationCallBack
            });

            function animationCallBack() {
                setTimeout(function () {
                    $(card.getCardElement()).animate({
                            top: ((numOfCards - zIndex) * 0.5) + 20,
                            left: ((numOfCards - zIndex) * 0.5) + 20
                        }, {
                            duration: (200 + (zIndex * 5)),
                            easing: 'easeOutBack'
                        }
                    );
                }, ( (numOfCards - zIndex) * 20 ));
            }

        });
        cardContainer.addClass("stacked");
    });
    $("#sortCard").click(function () {
        deckOfCards = sortCards(deckOfCards);
        cardZIndex = 1;
        deckOfCards.forEach(function (card) {
            card.setZIndex(cardZIndex++)
        });
        cardContainer.hasClass("stacked") || gridCards(true, false)
    });
    //Stack Cards
    $("#stackCard").click(stackedCards);

    function stackedCards() {
        var cardHeight = 240;
        var margin = 20;
        var parentHeight;
        var lastIndex;
        console.log(event);
        deckOfCards.forEach(function (card) {
            var zIndex = $(card.getCardElement()).css("z-index");
            $(card.getCardElement()).stop();
            setTimeout(function () {
                $(card.getCardElement()).animate({
                    top: ((numOfCards - zIndex) * 0.5) + 20,
                    left: ((numOfCards - zIndex) * 0.5) + 20
                }, (400 + (zIndex * 5) ), 'easeOutBack');
            }, ( zIndex * 20 ));
        });
        cardContainer.addClass("stacked");
    }


    //Grid Cards
    $("#gridCard").click(function () {
        gridCards(false, true);
    });

    function gridCards(isShuffled, isStacked) {
        var row = 0;
        var col = 0;
        var margin = 20;
        var cardWidth = 160;
        var cardHeight = 240;
        var parentWidth = cardContainer.width();
        var parentHeight;
        deckOfCards.forEach(function (card) {
            var cardElem = card.getCardElement();
            var zIndex = $(cardElem).css("z-index");
            var leftOffset = (cardWidth * col) + (margin * (col + 1));

            if ((leftOffset + cardWidth) > parentWidth) {
                col = 0;
                row++;
            }
            leftOffset = (cardWidth * col) + (margin * (col + 1));
            var topOffset = (cardHeight * row) + (margin * (row + 1));
            if (!(leftOffset === $(cardElem).css('left') && topOffset === $(cardElem).css('top'))) {
                $(cardElem).stop();
                if (isShuffled) {
                    animateCard();
                } else {
                    if (isStacked) {
                        setTimeout(function () {
                            animateCard();
                        }, ( (numOfCards - zIndex) * 20 ));
                    }
                    else {
                        setTimeout(function () {
                            animateCard();
                        }, (zIndex * 20));
                    }
                }
            }

            function animateCard() {
                $(cardElem).animate({
                    top: topOffset,
                    left: leftOffset
                }, (600 + (zIndex * 5) ), 'easeOutCirc');
            }


            parentHeight = topOffset + cardHeight + margin;
            col++;
        });
        cardContainer.animate({
            height: parentHeight
        }, 1000, 'easeOutCirc');
        cardContainer.removeClass("stacked");
    }

    $("#zoomIn").click(function () {
        var zoom = cardContainer.css("zoom");
        var isShuffled = !cardContainer.hasClass('stacked');
        cardContainer.animate({zoom: parseFloat(zoom) + .06}, {
            duration: 200, complete: function () {
                isShuffled && gridCards(true);
            }
        });
    });

    $("#zoomOut").click(function () {
        var zoom = cardContainer.css("zoom");
        var isShuffled = !cardContainer.hasClass('stacked');
        cardContainer.animate({zoom: parseFloat(zoom) - .06}, {
            duration: 200, complete: function () {
                isShuffled && gridCards(true);
            }
        });
    });

    $("#resetZoom").click(function () {
        var isShuffled = !cardContainer.hasClass("stacked");
        cardContainer.animate({zoom: 1}, {
            duration: 200, complete: function () {
                isShuffled && gridCards(true);
            }
        })
    });

    $("#removeCard").click(function () {
        cards.removeAllCards();
    });

    var clickTimer;
    $(".card-container ").on("mousedown", ".card", function (event) {

        var cardElem = $(this);
        clickTimer = setTimeout(function () {
            cardElem.addClass("no-click");
        }, 300);

        var currCardId = cardElem.attr("id");
        var cardsArr = cards.getCards();
        var numOfCards = cardsArr.length;
        var currCard;
        for (var i = 0; i < numOfCards; i++) {
            var card = cardsArr[i];
            if (currCardId == card.getCardId()) {
                currCard = cardsArr.splice(i, 1);
                break;
            }
        }
        cardsArr.push(currCard[0]);
        for (var i = 0; i < numOfCards; i++) {
            var card = cardsArr[i];
            card.setZIndex(i + 1);
        }
    }).on("mouseup", ".card", function () {
        clearTimeout(clickTimer);
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function sortCards(t) {
        return t.sort(function (a, b) {
            return a.getCardNum() > b.getCardNum() ? 1 : a.getCardNum() < b.getCardNum() ? -1 : 0
        });
    }

});
