"use strict";
function rounding(arrInput) {
    let [num, n] = arrInput;
    if (n > 15) {
      n = 15;
    }

    let output = num.toFixed(n);
    output = Number(output);

    console.log(output);
}

rounding([2.12345678901234567890, 22]);