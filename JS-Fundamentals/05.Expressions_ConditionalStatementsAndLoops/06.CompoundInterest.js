"use strict";
function compoundInterest(arrInput) {
    let [p, i, n, t] = arrInput;

    let f = p * Math.pow(
        1 + (i / (100 * (12 / n))),
        (12 / n) * t
    );

    console.log(f.toFixed(2));
}

compoundInterest([100000, 5, 12, 25]);