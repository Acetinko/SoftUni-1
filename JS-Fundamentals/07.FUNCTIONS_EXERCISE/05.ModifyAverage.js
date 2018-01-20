function modifyAverage(num) {

    while (isHigherThanFive(num)) {
        num = Number(num.toString() + 9);
    }

    console.log(num);

    function isHigherThanFive(num) {
        let arrNum = num
            .toString()
            .split('')
            .map(Number);
        let average = arrNum
            .reduce((a, b) => a + b, 0) / arrNum.length;

        return average <= 5;
    }
}

modifyAverage(101);