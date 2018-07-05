function multiply_DivideNumberByGivenSecondNumber(input) {
    let n = Number(input[0]);
    let x = Number(input[1]);

    if (x >= n) {
        return x * n;
    }

    return n / x;
}