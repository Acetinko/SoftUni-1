function rotateArray(arr) {
    let count = Number(arr[arr.length - 1]);
    arr.splice(arr.length - 1, 1);
    count %= arr.length;

    for (let i = 0; i < count; i++) {
        rotate(arr);
    }

    console.log(arr.join(' '));

    function rotate(arr) {
        arr.unshift(arr.pop());
        return arr;
    }
}

rotateArray([1,
2,
3,
4,
2
]);