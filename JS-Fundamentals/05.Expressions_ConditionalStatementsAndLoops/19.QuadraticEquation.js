"use strict";
function quadraticEquation(a, b, c) {

    let d = (b * b) - 4 * a * c;

    if (d > 0) {
        let x1 = (-b + Math.sqrt(d)) / (2 * a);
        let x2 = (-b - Math.sqrt(d)) / (2 * a);
        console.log(x2);
        console.log(x1);
    } else if (d === 0) {
        let x = -b / (2 * a);
        console.log(x);
    } else {
        console.log("No");
    }
}

quadraticEquation(5, 2, 1);