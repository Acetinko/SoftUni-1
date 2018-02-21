function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

//Higher-Order Functions
function result(func) {
    return function (value) {
        return func(',', '$', true, value)
    }
}

//
let dollarFormatter = result(currencyFormatter);
console.log(dollarFormatter(5345));   // $ 5345,00
console.log(dollarFormatter(3.1429)); // $ 3,14
console.log(dollarFormatter(2.709));  // $ 2,71

//or
console.log(result(currencyFormatter)(5345));   // $ 5345,00
console.log(result(currencyFormatter)(3.1429)); // $ 3,14
console.log(result(currencyFormatter)(2.709));  // $ 2,71
