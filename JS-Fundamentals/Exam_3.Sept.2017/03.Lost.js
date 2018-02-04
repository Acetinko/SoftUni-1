function lost(keyword, text) {
    let pattern = /(north|east)(\D*)(\d{2})(.*?),(\D*)(\d{6})/gi;
    let regKey = new RegExp(`(${keyword})(.+?)(${keyword})`, "g");
    let messages = regKey.exec(text)[2];
    let north = "";
    let east = "";

    let match = pattern.exec(text);
    while (match) {
        if (match[1].toLowerCase() === "north") {
            north = `${match[3]}.${match[6]} N`;
        } else if (match[1].toLowerCase() === "east") {
            east = `${match[3]}.${match[6]} E`;
        }
        match = pattern.exec(text);
    }

    console.log(north);
    console.log(east);
    console.log(`Message: ${messages}`);
}

lost(
    '4ds',
    'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532'
);

lost(
    '<>',
    'o u%&lu43t&^ftgv><nortH4276hrv756dcc,  jytbu64574655k <>ThE sanDwich is iN the refrIGErator<>yl i75evEAsTer23,lfwe 987324tlblu6b'
);