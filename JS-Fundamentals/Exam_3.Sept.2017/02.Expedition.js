function expedition(primaryMatrix, secondaryMatrix, targetCoordinates, startingPoint) {
    let steps = 0;

    //// da si napamnem matricite
    for (let coordinate of targetCoordinates) {
        modifyPrimaryMatrix(coordinate);
    }

    //let currentPosition = primaryMatrix[starCoordinates[0]][startCoordinates[1]];

    let currentRow = currentPosition[0];
    let previousDirection;
    let currentCol = currentPosition[1];
    while (true) {

        if (currentRow + 1 < primaryMatrix.length &&
            primaryMatrix[currentRow + 1][currentCol] !== undefined && previousDirection !== "up") {
            previousDirection = "down";
        } else if (currentCol + 1 < primaryMatrix[0].length &&
            primaryMatrix[currentRow][currentCol + 1] !== undefined && previousDirection !== "left") {
            previousDirection = "right";
        } else if (currentRow - 1 >= 0 &&
            primaryMatrix[currentRow - 1][currentCol] !== undefined && previousDirection !== "down") {
            previousDirection = "up";
        } else if (currentRow - 1 >= 0 &&
            primaryMatrix[currentRow - 1][currentCol] !== undefined && previousDirection !== "right") {
            previousDirection = "left";
        } else {
            break;
        }
        steps++;
    }

    //where have we reached
    console.log(steps);

    definePosition(currentPosition);

    function modifyPrimaryMatrix(targetRow, targetCol) {
        for (let row = 0; row < secondaryMatrix.length; row++) {
            let secondaryMatrixRow = secondaryMatrix[row];
            if (primaryMatrix[targetRow + row][targetCol] !== undefined) {
                for (let col = 0; col < secondaryMatrix[0].length; col++) {

                    if (secondaryMatrix[row][col] === 1 &&
                        primaryMatrix[targetRow + row][targetCol + col] !== undefined) {
                        primaryMatrix[targetRow + row][targetCol + col] =
                            primaryMatrix[targetRow + row][targetCol + col] === 1 ? 0 : 1;
                    }

                }
            }
        }
    }

    function definePosition([endRow, endCol]) {
        let output = '';
        if (endRow === 0) {
            output = 'Top'
        } else if (endCol === 0) {
            output = 'Left'
        } else if (endRow === primaryMatrix.length - 1) {
            output = 'Bottom'
        } else if (endCol === primaryMatrix[0].length - 1) {
            output = 'Right'
        } else if (endRow < primaryMatrix.length / 2 && endCol >= primaryMatrix[0].length / 2) {
            output = 'Dead end 1';
        } else if (endRow < primaryMatrix.length / 2 && endCol < primaryMatrix[0].length / 2) {
            output = 'Dead end 2';
        } else if (endRow >= primaryMatrix.length / 2 && endCol < primaryMatrix[0].length / 2) {
            output = 'Dead end 3';
        } else if (endRow >= primaryMatrix.length / 2 && endCol >= primaryMatrix[0].length / 2) {
            output = 'Dead end 4';
        }
        return output;
    }
}

expedition([[1, 1, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 0, 0]],
    [[0, 1, 1],
        [0, 1, 0],
        [1, 1, 0]],
    [[1, 1],
        [2, 3],
        [5, 3]],
    [0, 2]
);