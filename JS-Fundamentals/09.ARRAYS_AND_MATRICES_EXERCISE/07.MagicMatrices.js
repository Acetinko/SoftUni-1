function magicMatrices(matrix) {
    let isMagic = true;
    let sum = matrix[0].reduce((a, b) => a + b);

    for(let i = 1; i < matrix.length; i++) {
        if(sum !== matrix[i].reduce((a,b) => a+b)) {
            isMagic = false;
            break;
        }
    }

    for (let col = 0; col < matrix[0].length; col++) {
        let sumCol = matrix.reduce((a, b) => a + b[col], 0);
        if (sumCol !== sum) {
            isMagic = false;
            break;
        }
    }

    console.log(isMagic);
}

magicMatrices([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
);