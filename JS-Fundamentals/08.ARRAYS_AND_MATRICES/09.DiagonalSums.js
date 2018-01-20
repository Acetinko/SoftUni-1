function diagonalSums(matrix) {
    let main = 0, secondary = 0;

    for(let row = 0; row < matrix.length; row++) {
        main += matrix[row][row];
        secondary += matrix[row][matrix[row].length - row - 1];
    }

    console.log(`${main} ${secondary}`);
}

diagonalSums([[3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]]
);