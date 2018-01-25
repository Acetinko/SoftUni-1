function secretData(arr) {
    let pattern = /([*][A-Z][A-Za-z]*(?=\t| |$))|([+][0-9\-]{10}(?=\t| |$))|(![a-zA-Z0-9]+(?=\t| |$))|(_[a-zA-Z0-9]+(?=\t| |$))/g;

    for (let str of arr) {
        let match = str.match(pattern);
        if (match !== null) {
            for (let m of match) {
                if (m.trim().length === 0) {
                    continue;
                }
                str = str.replace(m.trim(), "|".repeat(m.trim().length));
            }
        }

        console.log(str);
    }
}

secretData([
    'Agent * *Ivankov **Ivankov was in the room when it all happened.',
    'WEwe 5*Ivankov.',
    'The person in the room was heavily armed.',
    'Agent *Ivankov had to act quick in order.',
    'He picked up his phone and called some unknown number.',
    'I think it was +555-49-796',
    'I can\'t really remember...',
    'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
    'Then after that he disappeared from my sight.',
    'As if he vanished in the shadows.',
    'A moment, shorter than a second, later, I saw the person flying off the top floor.',
    'I really don\'t know what happened there.',
    'This is all I saw, that night.',
    'I cannot explain it myself...'
]);