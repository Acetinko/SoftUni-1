"use strict";

function oddNumbers1toN(n) {
    for (let i = 1; i <= n; i++) {
        if (parseInt(i % 2) !== 0) {
            console.log(i);
        }
    }
}

oddNumbers1toN(5);