function matchTheDates(str) {
    for (let obj of str) {
        let pattern = /\b(\d{1,2})-([A-Z][a-z]{2})-(\d{4})/g;

        while (reg = pattern.exec(obj)) {
            console.log(`${reg[0]} (Day: ${reg[1]}, Month: ${reg[2]}, Year: ${reg[3]})`);
        }
    }
}

matchTheDates(['1-Jan-1999 is a valid date.',
    'So is 01-July-2000.',
    'I am an awful liar, by the way',
    '-- Ivo, 28-Sep-2016.']);