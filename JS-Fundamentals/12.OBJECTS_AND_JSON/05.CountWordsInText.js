function countWordsInText(arr) {
    let obj = {};
    let word = arr[0].match(/\w+/g);

    for (let w of word) {
        obj[w] === undefined ? obj[w] = 1: obj[w]++;
    }
    console.log(JSON.stringify(obj));
}

countWordsInText([ 'Far too slow, you\'re far too slow.' ]);
countWordsInText(['JS devs use Node.js for server-side JS.-- JS for devs']);