function processOddNumbers(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {

        result = arr.filter((NaN, i) => i % 2 !== 0).map(x => 2 * x);
    }

    console.log(result.reverse().join(' '));
}

processOddNumbers([3, 0, 10, 4, 7, 3]);