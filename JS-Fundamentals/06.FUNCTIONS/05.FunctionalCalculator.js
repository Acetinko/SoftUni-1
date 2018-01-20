"use strict";

function functionalCalculator(a, b, oper) {

    let calc = function (a, b, func) {
        console.log(func(a, b));
    };

    let add = function (a, b) {
        return a + b
    };
    let subtract = function (a, b) {
        return a - b
    };
    let multiply = function (a, b) {
        return a * b
    };
    let divide = function (a, b) {
        return a / b
    };

    switch (oper) {
        case '+':
            return calc(a, b, add);
        case '-':
            return calc(a, b, subtract);
        case '*':
            return calc(a, b, multiply);
        case '/':
            return calc(a, b, divide);
    }
}

functionalCalculator(18, -1, '*');