function printEveryN_thElementFromAnArray(arr) {
    let n = arr[arr.length - 1];

    for (let i = 0; i < arr.length - 1; i += n) {
        console.log(arr[i]);
    }
}

printEveryN_thElementFromAnArray(["dsa",
    "asd",
    "test",
    "tset",
    2
]);