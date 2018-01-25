function findVariableNamesInSentences(text) {
    let pattern = /\b_[a-zA-Z0-9]+\b/g;
    let result = [];
    let match = text.match(pattern);

    if (match !== null) {
        for (let m of match) {
            result.push(m.substring(1));
        }
    }
    console.log(result.join(','));
}

findVariableNamesInSentences('The _id and _age variables are both integers.');
findVariableNamesInSentences('__invalidVariable _evenMoreInvalidVariable_ _validVariable');