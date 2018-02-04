function rosettaStone(arr) {
    let templateMatrixSide = +arr.shift();

    let templateMatrix = [];
    for (let i = 0; i < templateMatrixSide; i++) {
        templateMatrix.push(arr[i].split(/\s/).map(Number));
    }

    let encoderMatrix = [];
    for (let i = templateMatrixSide; i < arr.length; i++) {
        encoderMatrix.push(arr[i].split(/\s/).map(Number));
    }

    let templateMatrixSideRow = templateMatrixSide;
    let templateMatrixSideCol = templateMatrix[0].length;

    for (let encoderRow = 0; encoderRow < encoderMatrix.length; encoderRow += templateMatrixSideRow) {
        for (let encoderCol = 0; encoderCol < encoderMatrix[encoderRow].length; encoderCol += templateMatrixSideCol) {

            for (let templateRow = 0; templateRow < templateMatrix.length; templateRow++) {
                for (let templateCol = 0; templateCol < templateMatrix[templateRow].length; templateCol++) {

                    let targetRow = encoderRow + templateRow;
                    let targetCol = encoderCol + templateCol;

                    if (!(targetCol < encoderMatrix[encoderRow].length && targetRow < encoderMatrix.length)) {
                        continue;
                    }

                    let summedNumber = encoderMatrix[targetRow][targetCol] + templateMatrix[templateRow][templateCol];
                    summedNumber %= 27;

                    if (summedNumber === 0) {
                        encoderMatrix[targetRow][targetCol] = ' ';
                    } else {
                        encoderMatrix[targetRow][targetCol] = String.fromCharCode(summedNumber + 64);
                    }
                }
            }
        }
    }

    let message = "";
    encoderMatrix.forEach(row => row.forEach(col => message += col));
    console.log(message);
}

rosettaStone([
    '2',
    '59 36',
    '82 52',
    '4 18 25 19 8',
    '4 2 8 2 18',
    '23 14 22 0 22',
    '2 17 13 19 20',
    '0 9 0 22 22'
]);