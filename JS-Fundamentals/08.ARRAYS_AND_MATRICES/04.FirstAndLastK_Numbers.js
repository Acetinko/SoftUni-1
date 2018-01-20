function firstAndLastK_Numbers(arr) {
    let k = arr.shift();

    console.log(arr.slice(0, k).join(' '));
    console.log(arr.slice(arr.length - k, k + 1).join(' '));
}

firstAndLastK_Numbers([3,
    6, 7, 8, 9]
);