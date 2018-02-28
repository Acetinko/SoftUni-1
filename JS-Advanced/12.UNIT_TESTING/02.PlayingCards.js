function playingCards(card, suit) {
    const VALID_CARDS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const VALID_SUITS = {
        'S': '\u2660', // Spades (♠)
        'H': '\u2665', // Hearts (♥)
        'D': '\u2666', // Diamonds (♦)
        'C': '\u2663' // Clubs (♣)
    };

    if (VALID_CARDS.indexOf(card) < 0 || !VALID_SUITS.hasOwnProperty(suit)) {
        throw new Error("Error")
    }

    return {
        card: card,
        suit: VALID_SUITS[suit],
        toString: function () {
            return this.card + this.suit;
        }
    }
}


    //console.log('' + playingCards('A', 'S'));	 // A♠
    //console.log('' + playingCards('10', 'H')); // 10♥
    //console.log('' + playingCards('1', 'C'));	 // Error
