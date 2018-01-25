function extractTheLinks(arr) {
    let pattern = /www\.[a-zA-Z0-9-\.]+\.[a-z]+/g;
    let result = [];

    for (let value of arr) {
        let match = value.match(pattern);
        if (match === null) {
            continue;
        }

        for (let m of match) {
            result.push(m);
        }
    }

    console.log(result.join('\n'));
}

extractTheLinks([
    'Join WebStars now for free, at www.web-stars.com',
    'You can also support our partners:',
    'Internet - www.internet.com',
    'WebSpiders - www.webspiders101.com',
    'Sentinel - www.sentinel.-ko'
]);

extractTheLinks([
    'Instruments www.Instruments.rom.com.trombone2000 Instrument here',
    'Need information about cheap hotels in London?',
    'You can check us at www.london-hotels.co.uk!',
    'We provide the best services in London.',
    'Here are some reviews in some blogs:',
    '"London Hotels are awesome!" - www.indigo.bloggers.com',
    '"I am very satisfied with their services" - ww.ivan.bg',
    '"Best Hotel Services!" - www.rebel21.sedecrem.moc'
]);