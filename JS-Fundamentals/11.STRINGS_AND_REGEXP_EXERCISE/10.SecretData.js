function secretData(arr) {

    for (let str of arr) {
        let pattern = /([*][A-Z][A-Za-z]*(?=\t|\s|$))/g;
        str = str.replace(pattern, replacer);

        pattern = /([+][0-9\-]{10}(?=\t| |$))/g;
        str = str.replace(pattern, replacer);

        pattern = /(![a-zA-Z0-9]+(?=\t| |$))/g;
        str = str.replace(pattern, replacer);

        pattern = /(_[a-zA-Z0-9]+(?=\t| |$))/g;
        str = str.replace(pattern, replacer);

        console.log(str);
    }
    
    function replacer(m, gr1, gr2) {
        gr1 = gr1.replace(/.*/g,
                x => "|".repeat(x.trim().length));
        return gr1;
    }
}

secretData([
    'Agent *Ivankov was in the room when it all happened. *Ivankov was.',
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