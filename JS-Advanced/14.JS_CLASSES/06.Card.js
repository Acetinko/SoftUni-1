let result = (function () {
    const Suits = {
        CLUBS: "\u2663",    // ♣
        DIAMONDS: "\u2666", // ♦
        HEARTS: "\u2665",   // ♥
        SPADES: "\u2660"    // ♠
    };

    const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        set face(face) {
            if (!FACES.includes(face)) {
                throw new Error("Invalid card face " + face);
            }
            this._face = face;
        }

        get face() {
            return this._face;
        }

        set suit(suit) {
            if (!Object.keys(Suits).map(k => Suits[k]).includes(suit)) {
                throw new Error("Invalid card suit " + suit);
            }
            this._suit = suit;
        }

        get suit() {
            return this._suit;
        }

        toString() {
            return this._face + this._suit;
        }
    }

    return {
        Suits,
        Card
    }
}());

let Card = result.Card;
let Suits = result.Suits;

let c1 = new Card('2', Suits.CLUBS);
console.log(c1.toString());