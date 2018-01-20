"use strict";
function figureOf4Squares(n) {
    let length = n % 2 !== 0 ? n : n - 1;
    let count  = (2 * n - 4) / 2;
    let middle = Math.ceil(length / 2);
    let line = "";

    for (let row = 1; row <= length; row++) {
        if (row === 1 || row === middle || row === length) {
            line += `+${'-'.repeat(count)}+${'-'.repeat(count)}+\n`;
        } else {
            line += `|${' '.repeat(count)}|${' '.repeat(count)}|\n`;
        }
    }

    console.log(line);
}

figureOf4Squares(3);