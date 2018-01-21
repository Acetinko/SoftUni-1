function orbit(arr) {
    let [width, height, x, y] = arr;

    let matrix = [];
    for(let i = 0; i < width; i++) {
        matrix.push([]);
    }

    for(let row = 0; row < width; row++) {
        for(let col = 0; col < height; col++) {
            matrix[row][col] = Math.max(Math.abs(row - x), Math.abs(col - y)) + 1;
        }
    }

    console.log(matrix.map(row => row.join(" ")).join("\n"));
}

orbit([4, 4, 0, 0]);