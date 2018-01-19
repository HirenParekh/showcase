/**
 * Created by Hiren on 21-09-2016.
 */
var cards = (function () {
    const ONE = "one";
    const TWO = "two";
    const THREE = "three";
    const FOUR = "four";
    const FIVE = "five";
    const SIX = "six";
    const SEVEN = "seven";
    const EIGHT = "eight";
    const NINE = "nine";
    const TEN = "ten";
    const JACK = "jack";
    const QUEEN = "queen";
    const KING = "king";

    const DIAMONDS = "diamonds";
    const HEARTS = "hearts";
    const CLUBS = "clubs";
    const SPADES = "spades";

    var cardTypes = [SPADES, HEARTS, CLUBS, DIAMONDS];

    var cardValues = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING];

    var patterns = {
        one: ["middle-center"],
        two: ["top-center", "bottom-center"],
        three: ["top-center", "middle-center", "bottom-center"],
        four: ["top-left", "top-right", "bottom-left", "bottom-right"],
        five: ["top-left", "top-right", "middle-center", "bottom-left", "bottom-right"],
        six: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"],
        seven: ["top-left", "top-right", "middle-left", "middle-top", "middle-right", "bottom-left", "bottom-right"],
        eight: ["top-left", "top-right", "middle-left", "middle-top", "middle-bottom", "middle-right", "bottom-left", "bottom-right"],
        nine: ["top-left", "top-right", "middle-top-left", "middle-top-right", "middle-bottom-left", "middle-bottom-right", "middle-center", "bottom-left", "bottom-right"],
        ten: ["top-left", "top-right", "middle-top-left", "middle-top-right", "middle-bottom-left", "middle-bottom-right", "middle-top-center", "middle-bottom-center", "bottom-left", "bottom-right"],
    }

    const MAX_Z_INDEX = 52;

    var cardZIndex;

    var cardsArray = [];

    function initializeCards() {

        cardZIndex = 1;
        cardsArray = [];

        var cardElements = $(".card");
        var numEl = cardElements.length;

        for (var i = 0; i < numEl; i++) {
            var card = makeCardObj(cardElements[i]);
            if (cardsArray.indexOf(card) == -1) {
                cardsArray.push(card);
            }
            $(cardElements[i]).replaceWith(card.getCardElement);
        }
    }

    $("#sortCard").click(function () {
        s = c(s), cardZIndex = 1, s.forEach(function (t) {
            t.setZIndex(cardZIndex++)
        }), d.hasClass("stacked") || n(!0, !1)
    })

    function Card(type, value, state) {

        var type = type;
        var value = value;
        var state = (typeof state !== 'undefined') ? state : 1;
        var zIndex = cardZIndex++;
        var cardNumber = cardZIndex++;
        var cardId = makeCardId(type, value);
        var cardElement = createCardElement();

        function getCardId() {
            return cardId;
        }

        function flip(value) {
            value = (typeof value !== 'undefined') ? value : 1;
            state = value * state * -1;
            var cardElem = $("#" + cardId);
            cardElem.children(".card-data").children().toggle();
            cardElem.children(".card-data").toggleClass("card-background");
        }

        function getState() {
            return state;
        }

        function getType() {
            return type;
        }

        function setType(newType) {
            type = newType;
        }

        function getValue() {
            return value;
        }

        function setValue(newValue) {
            value = newValue;
        }

        function getZIndex() {
            return zIndex;
        }

        function setZIndex(newIndex) {
            zIndex = newIndex;
            $(cardElement).css("z-index", newIndex);
        }

        function getCardNumber() {
            return cardNumber;
        }

        function createCardElement() {
            var newCardObj = document.createElement("div");
            $(newCardObj).addClass("card");
            $(newCardObj).addClass(type);
            $(newCardObj).addClass(value);

            var cardData = document.createElement("div");
            $(cardData).addClass("card-data");
            $(cardData).addClass("data-" + type);

            var cardLeftView = document.createElement("div");
            $(cardLeftView).addClass("card-left-view");

            var cardCenterView = document.createElement("div");
            $(cardCenterView).addClass("card-center-view");
            $(cardCenterView).css("padding", "10px 5px");
            if (value == JACK || value == QUEEN || value == KING) {
                var span = document.createElement("span");
                var image = document.createElement("img");
                $(image).attr("src", "assets/cards/images/face-" + value + "-" + type + ".png");
                $(image).attr("width", "100%");
                $(image).attr("height", "100%");

                $(span).append(image);
                $(cardCenterView).append(span);
            }
            else {
                var patternArray = patterns[value];
                patternArray.forEach(function (elem) {
                    var span = document.createElement("span");
                    $(span).text(getSymbolByType(type));
                    $(span).addClass("suit");
                    $(span).addClass(elem);
                    $(cardCenterView).append(span);
                });
            }
            var cardRightView = document.createElement("div");
            $(cardRightView).addClass("card-right-view");

            var cardType = document.createElement("div");
            $(cardType).addClass("card-type");

            var cardValue = document.createElement("div");
            $(cardValue).addClass("card-value");

            $(cardValue).text(getTextByValue(value));
            $(cardType).text(getSymbolByType(type));

            $(cardValue).clone(true).appendTo($(cardLeftView));
            $(cardType).clone(true).appendTo($(cardLeftView));


            $(cardRightView).append(cardValue);
            $(cardRightView).append(cardType);

            $(cardData).append(cardLeftView);
            $(cardData).append(cardCenterView);
            $(cardData).append(cardRightView);

            $(newCardObj).append(cardData);

            if (state == -1) {
                $(cardData).children().toggle();
                $(cardData).addClass("card-background");
            }

            //set z-index property
            $(newCardObj).css("z-index", zIndex);

            //set id property
            $(newCardObj).attr("id", cardId);

            $(newCardObj).click(function (event) {
                if ($(newCardObj).hasClass("no-click")) {
                    $(newCardObj).removeClass("no-click");
                }
                else {
                    flip();
                }
            });

            $(newCardObj).draggable({
                containment: "parent",
                cursor: "move",
                start: function (event, ui) {
                    $(newCardObj).addClass('no-click');
                }
            });

            return newCardObj;
        }

        function getCardElement() {
            return cardElement ? cardElement : createCardElement();
        }

        return {
            flip: flip,
            getState: getState,
            getType: getType,
            setType: setType,
            getValue: getValue,
            setValue: setValue,
            getCardId: getCardId,
            getZIndex: getZIndex,
            setZIndex: setZIndex,
            getCardNum: getCardNumber,
            getCardElement: getCardElement
        }
    }

    function makeCardId(type, value) {
        return (value + "of" + type);
    }

    function getCardObj(type, value, state) {

        var card = getCardObjById(makeCardId(type, value));
        return card ? card : new Card(type, value, state);
    }

    function getCardObjById(id) {

        var foundCard = cardsArray.find(function (currCard) {
            return currCard.getCardId() === id;
        });
        return foundCard;
    }

    function makeCardObj(cardElement) {

        var card;
        var cardType = getCardType(cardElement);
        var cardValue = getCardValue(cardElement);
        var state = $(cardElement).hasClass("card-flip") ? -1 : 1;
        if (cardType != null && cardValue != null) {
            card = getCardObj(cardType, cardValue, state);
        }
        return card;
    }

    function addCard(card, parentElement) {
        $(parentElement).children(".clear").before(card.getCardElement());
        if (cardsArray.indexOf(card) == -1) {
            cardsArray.push(card);
        }
    }

    function getCardType(card) {
        var cardType = "";
        if ($(card).hasClass(HEARTS)) {
            cardType = HEARTS;
        }
        if ($(card).hasClass(CLUBS)) {
            cardType = CLUBS;
        }
        if ($(card).hasClass(SPADES)) {
            cardType = SPADES;
        }
        if ($(card).hasClass(DIAMONDS)) {
            cardType = DIAMONDS;
        }
        return cardType;
    }

    function getCardValue(card) {
        var cardValue = "";
        if ($(card).hasClass(ONE)) {
            cardValue = ONE;
        }
        if ($(card).hasClass(TWO)) {
            cardValue = TWO;
        }
        if ($(card).hasClass(THREE)) {
            cardValue = THREE;
        }
        if ($(card).hasClass(FOUR)) {
            cardValue = FOUR;
        }
        if ($(card).hasClass(FIVE)) {
            cardValue = FIVE;
        }
        if ($(card).hasClass(SIX)) {
            cardValue = SIX;
        }
        if ($(card).hasClass(SEVEN)) {
            cardValue = SEVEN;
        }
        if ($(card).hasClass(EIGHT)) {
            cardValue = EIGHT;
        }
        if ($(card).hasClass(NINE)) {
            cardValue = NINE;
        }
        if ($(card).hasClass(TEN)) {
            cardValue = TEN;
        }
        if ($(card).hasClass(JACK)) {
            cardValue = JACK;
        }
        if ($(card).hasClass(QUEEN)) {
            cardValue = QUEEN;
        }
        if ($(card).hasClass(KING)) {
            cardValue = KING;
        }

        return cardValue;
    }

    function getSymbolByType(type) {
        var symbol = "";
        switch (type) {
            case DIAMONDS: {
                symbol = "♦";
                break;
            }
            case HEARTS: {
                symbol = "♥";
                break;
            }
            case CLUBS: {
                symbol = "♣";
                break;
            }
            case SPADES: {
                symbol = "♠";
                break;
            }
        }
        return symbol;
    }

    function getTextByValue(value) {
        var text = "";
        switch (value) {
            case ONE: {
                text = "A";
                break;
            }
            case TWO: {
                text = "2";
                break;
            }
            case THREE: {
                text = "3";
                break;
            }
            case FOUR: {
                text = "4";
                break;
            }
            case FIVE: {
                text = "5";
                break;
            }
            case SIX: {
                text = "6";
                break;
            }
            case SEVEN: {
                text = "7";
                break;
            }
            case EIGHT: {
                text = "8";
                break;
            }
            case NINE: {
                text = "9";
                break;
            }
            case TEN: {
                text = "10";
                break;
            }
            case JACK: {
                text = "J";
                break;
            }
            case QUEEN: {
                text = "Q";
                break;
            }
            case KING: {
                text = "K";
                break;
            }
        }
        return text;
    }

    function getCards() {
        return cardsArray;
    }

    function destroyCards() {
        cardsArray.forEach(function (card) {
            $(card.getCardElement()).remove();
        });
        cardZIndex = 1;
        cardsArray = [];
        console.log(cardsArray.length);
    }

    function getDeckOfCards() {
        //destroyCards();
        console.log(cardsArray.length);
        for (var i = 0; i < cardTypes.length; i++) {
            for (var j = 0; j < cardValues.length; j++) {
                var card = getCardObjById(makeCardId(cardTypes[i], cardValues[j]));
                if (card) {
                    card = cardsArray.splice(cardsArray.indexOf(card), 1);
                    cardsArray.push(card[0]);
                }
                else {
                    cardsArray.push(new Card(cardTypes[i], cardValues[j]))
                }
            }
        }
        cardZIndex = 1;
        cardsArray.forEach(function (card) {
            card.setZIndex(cardZIndex++);
        });

        return cardsArray;
    }

    function sortCards() {
        cardsArray.sort(function (a, b) {
            if (a.getZIndex() > b.getZIndex()) {
                return 1;
            }
            if (a.getZIndex() < b.getZIndex()) {
                return -1;
            }
            return 0;
        });
    }

    return {
        initialize: initializeCards,
        getCardObj: getCardObj,
        getCardValue: getCardValue,
        getCardType: getCardType,
        addCard: addCard,
        getCards: getCards,
        getCardObjById: getCardObjById,
        getDeckOfCards: getDeckOfCards,
        removeAllCards: destroyCards
    }
})();
