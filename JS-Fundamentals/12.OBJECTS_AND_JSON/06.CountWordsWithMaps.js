function countWordsWithMaps(arr) {
    let map = new Map();
    let word = arr[0].match(/\w+/g);

    for (let w of word) {
        w = w.toLowerCase();
        map.has(w) ? map.set(w, map.get(w) + 1) : map.set(w, 1);
    }

    //let allWords = Array.from(map.keys()).sort();
    //allWords.forEach(w => console.log(`\'${w}\' -> ${map.get(w)} times`));

    [...map].sort().forEach(arr => console.log(`'${arr[0]}' -> ${arr[1]} times`));
}

//countWordsWithMaps(['Far too slow, you\'re far too slow.']);
countWordsWithMaps(['JS devs use Node.js for server-side JS. JS devs use JS. -- JS for devs --']);