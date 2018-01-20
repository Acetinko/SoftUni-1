function stringOfNumbers1toN(num) {
    let strSum = "";
    for (let i = 1; i <= num; i++) {
        strSum += i;
    }
    console.log(strSum);
}

stringOfNumbers1toN(11);