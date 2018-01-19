/**
 * Created by Hiren on 21-09-2016.
 */
$(document).ready(function () {
    $(".btn-card-type").click(function () {
        $(this).toggleClass("active");
        $(this).siblings().removeClass("active");
        var valueBtns = $(".btn-card-value");
        valueBtns.removeClass("disabled");
    });

    $(".btn-card-type.data-hearts").click(function () {
        if ($(this).hasClass("active")) {
            addColorClass(".btn-card-value", "red-color");
            //disableValBtns("hearts");
        }
        else {
            addColorClass(".btn-card-value", "black-color");
        }
    });

    $(".btn-card-type.data-diamonds").click(function () {
        if ($(this).hasClass("active")) {
            addColorClass(".btn-card-value", "red-color");
            //disableValBtns("diamonds");
        }
        else {
            addColorClass(".btn-card-value", "black-color");
        }
    });

    $(".btn-card-type.data-clubs").click(function () {

        addColorClass(".btn-card-value", "black-color");
        if ($(this).hasClass("active")) {
            //disableValBtns("clubs");
        }

    });

    $(".btn-card-type.data-spades").click(function () {

        addColorClass(".btn-card-value", "black-color");
        if ($(this).hasClass("active")) {
            //disableValBtns("spades");
        }
    });

    $(".btn-card-value").click(function () {
        if (!($(this).hasClass("disabled"))) {
            $(this).toggleClass("active");
            $(this).siblings().removeClass("active");
        }
    });

    $("#addCard").click(function () {
        var cardType = $(".btn-card-type.active").attr("data-value");
        var cardValue = $(".btn-card-value.active").attr("data-value");
        if (cardType != null && cardValue != null) {
            var card = cards.getCardObj(cardType, cardValue);
            cards.addCard(card, $(".card-container"));
        }
        resetAllBtns();
    });

    function resetAllBtns() {
        $(".btn-card-type").removeClass("active");
        $(".btn-card-value").removeClass("active");
        $(".btn-card-value").removeClass("disabled");
        addColorClass(".btn-card-value", "black-color")
    }

    function addColorClass(selecter, calssName) {

        $(selecter).removeClass("red-color");
        $(selecter).removeClass("black-color");
        $(selecter).removeClass("gray-color");
        $(selecter).addClass(calssName);
    }

    function disableValBtns(cardType) {
        var cardsArr = cards.getCards();
        cardsArr.forEach(function (card) {
            if (card.getType() == cardType) {
                var selecter = ".btn-card-value[data-value='" + card.getValue() + "']";
                $(selecter).addClass('disabled');
                $(selecter).removeClass('active');
                addColorClass(selecter, "gray-color");
            }
        });
    }

    $("#flipCard").click(function (event) {
        var cardType = $(".btn-card-type.active").attr("data-value");
        var cardValue = $(".btn-card-value.active").attr("data-value");
        if (cardType != null && cardValue != null) {
            var card = cards.getCardObj(cardType,cardValue);
            card.flip();
        }
        else if (cardType != null) {
            var cardsByType = cards.getCards();
            cardsByType.forEach(function (card) {
                if (card.getType() == cardType) {
                    card.flip();
                }
            });
        }
        else if (cardValue != null) {
            var cardsByValue = cards.getCards();
            cardsByValue.forEach(function (card) {
                if (card.getValue() == cardValue) {
                    card.flip();
                }
            });
        }
        else {
            var cardsByValue = cards.getCards();
            cardsByValue.forEach(function (card) {
                card.flip();
            });
        }
        resetAllBtns();
    });


});