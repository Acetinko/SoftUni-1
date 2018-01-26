function extractUniqueWords(arr) {
    let unique = new Set();

    for (let i = 0; i < arr.length; i++) {
        let match = arr[i].toLowerCase().match(/\b\w+\b/g);

        if (match === null) {
            continue;
        }

        for (let m of match) {
            unique.add(m);
        }
    }

    console.log([...unique].join(', '));
}

extractUniqueWords([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui. ',
    'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla. ',
    'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis. ',
    'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut. ',
    'Morbi in ipsum varius, pharetra diam vel, mattis arcu. ',
    'Integer ac turpis commodo, varius nulla sed, elementum lectus. ',
    'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.'
]);