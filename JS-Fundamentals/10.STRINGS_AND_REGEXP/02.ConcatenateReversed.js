function concatenateReversed(arr) {
    let str = arr.join('');
    console.log(str.split('').reverse().join(''));
}

concatenateReversed(['I', 'am', 'student']);
concatenateReversed(['race', 'car']);