function matchMultiplication(str) {
    let pattern = /(-*[0-9]+)\s*\*\s*(-*[0-9\.*]+)/g;

    while (match = pattern.exec(str)) {
        let replace = (`${Number(match[1]) * Number(match[2])}`);
        str = str.replace(`${match[0]}`, replace);
    }

    console.log(str);
}

matchMultiplication('My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).');