function captureTheNumbers(arr) {
    let pattern = /\d+/g;
    let output = [];
    for (let value of arr) {
        let match = value.match(pattern);
        if (match === null) {
            continue;
        }

        for (let m of match) {
            output.push(m);
        }
    }
    console.log(output.join(' '));
}

captureTheNumbers(['The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45'
]);