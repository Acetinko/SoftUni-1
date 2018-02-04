function arithmephile(arr) {
    let sumMax = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        s = Number(arr[i]);
        if (s < 0 || s > 9) {
            continue;
        }

        let sum = 1;
        for (let j = 0; j < s; j++) {
            if (j < arr.length) {
                sum *= Number(arr[j + i + 1]);
            }
        }

        if (sum > sumMax) {
            sumMax = sum;
        }
    }
    console.log(sumMax);
}

arithmephile([
    100,
    200,
    2,
    3,
    2,
    3,
    2,
    1,
    1
]);