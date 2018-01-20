function negativePositiveNumbers(arr) {
    let result = [];

    for (let value of arr) {
        if (value < 0) {
            result.unshift(value);
        }else {
            result.push(value);
        }
    }

    console.log(result.join('\n'));
}

negativePositiveNumbers([3, -2, 0, -1]);