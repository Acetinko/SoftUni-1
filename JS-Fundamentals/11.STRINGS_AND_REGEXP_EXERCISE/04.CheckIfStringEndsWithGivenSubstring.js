function checkIfStringEndsWithGivenSubstring(text, subStr) {
    console.log(text.indexOf(subStr) === (text.length - subStr.length));
}

checkIfStringEndsWithGivenSubstring('This sentence ends with fun?', 'fun?');