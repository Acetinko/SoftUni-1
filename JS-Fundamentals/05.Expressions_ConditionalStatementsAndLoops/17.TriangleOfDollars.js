"use strict";

function triangleOfDollars(n) {
    for (let row = 1; row <= n; row++) {
        console.log(new Array(row + 1).join('$'));
    }
}

triangleOfDollars(3);