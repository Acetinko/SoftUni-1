function findOccurrencesOfWordInSentence(text, word) {
    let textLower = text.toLowerCase();
    let regex = new RegExp(`\\b${word.toLowerCase()}\\b`, "g");
    let count = 0;
    while (regex.exec(textLower)) {
        count++;
    }
    console.log(count);
}

findOccurrencesOfWordInSentence(
    'ThE waterfall was so high, that the child couldn’t see its peak.',
    'the'
);