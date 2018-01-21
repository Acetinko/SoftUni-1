function extractAnNon_decreasingSubsequenceFromAnArray(arr) {
    let temp = arr[0];
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (temp <= arr[i]) {
            result.push(arr[i]);
            temp = arr[i];
        }
    }

    if (result.length === 0) {
        result.push(temp);
    }

    console.log(result.join('\n'));
}

extractAnNon_decreasingSubsequenceFromAnArray([-9,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24
]);