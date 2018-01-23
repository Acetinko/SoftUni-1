function matchAllWords(str) {
    let regex = /(\w+)/g;

    if (regex.test(str)) {
        console.log(str.match(regex).join('|'));
    }
}
//matchAllWords('...');

matchAllWords('A Regular Expression needs to have the global flag in order to match all occurrences in the text');