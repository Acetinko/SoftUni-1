function uniqueSequences(arrStr) {
    let map = new Map();

    for (let i = 0; i < arrStr.length; i++) {
        let arr = JSON.parse(arrStr[i]).map(Number).sort((a, b) => b - a);
        let str = JSON.stringify(arr);
        if (!map.has(str)) {
            map.set(str, JSON.parse(str).length);
        }
    }

    for (let [key, value] of [...map].sort((a, b) => a[1] - b[1])) {
        console.log(`[${JSON.parse(key).map(Number).join(', ')}]`);
    }
}

uniqueSequences([
    '[-3, -2, -1, 0, 1, 2, 3, 4]',
    '[10, 1, -17, 0, 2, 13]',
    '[4, -3, 3, -2, 2, -1, 1, 0]'
]);