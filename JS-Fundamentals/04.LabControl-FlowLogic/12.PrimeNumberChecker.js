"use strict";

function primeNumberChecker(num) {
    let prime = true;

    for (let d = 2; d <= Math.sqrt(num); d++) {
        if (num % d === 0) {
            prime = false;
            break;
        }
    }

    if (prime && (num > 1)) {
        console.log("true");
    } else {
        console.log("false");
    }
}

primeNumberChecker(81);