"use strict";

function oddOrEven(number) {
    if (number % 2 === 0) {
        console.log("even")
    } else if (number === Math.round(number)){
        console.log("odd")
    } else {
        console.log("invalid");
    }
}

oddOrEven("dsad");