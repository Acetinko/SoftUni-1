let add = (function () {
    let sum = 0;

    return function addValue(number) {
        sum += number;

        addValue.toString = function () {
            return sum;
        };

        return addValue;
    }
})();

console.log(add(1).toString());
console.log(add(1)(6)(-3).toString());
