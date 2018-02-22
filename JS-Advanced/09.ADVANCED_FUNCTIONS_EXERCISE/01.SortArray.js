function sortArray(array, orderType) {

    let ascendingOrder = function (a, b) {
        return a - b;
    };

    let descendingOrder = function (a, b) {
        return b - a;
    };

    let sortingStrategies = {
        'asc': ascendingOrder,
        'desc': descendingOrder
    };

    return array.sort(sortingStrategies[orderType]);
}

console.log(sortArray([14, 7, 17, 6, 8], 'asc'));
console.log(sortArray([14, 7, 17, 6, 8], 'desc'));
