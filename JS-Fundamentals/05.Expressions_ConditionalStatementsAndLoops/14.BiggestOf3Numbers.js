"use strict";
function biggestOf3Numbers(input) {
    let [num1, num2, num3] = input;
    let maxNum = Math.max(num1, num2, num3);

    console.log(maxNum);
}

biggestOf3Numbers([3, 3, 3]);