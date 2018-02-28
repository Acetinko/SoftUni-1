function deckOfCards(arr) {
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

    for (let i = 0; i < arr.length; i++) {
        let suit = arr[i][arr[i].length - 1];
        let card = arr[i].substring(0, arr[i].length - 1);

        try{
            arr[i] = playingCards(card, suit);
        } catch (ex) {
            console.log("Invalid card: " + arr[i]);
            return
        }
    }

    console.log(arr.join(' '));
}

deckOfCards(['AS', '10D', 'KH', '2C']); //	A♠ 10♦ K♥ 2♣
deckOfCards(['5S', '3D', 'QD', '1C']); //	Invalid card: 1C
