function validityChecker(arr) {
    let [x1, y1, x2, y2] = arr;

    checkValidity(x1, y1, 0, 0);
    checkValidity(x2, y2, 0, 0);
    checkValidity(x1, y1, x2, y2);

    function checkValidity(x1, y1, x2, y2) {
        let output = `{${x1}, ${y1}} to {${x2}, ${y2}}`;

        let deltaX = x2 - x1;
        let deltaY = y2 - y1;

        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) % 1 === 0) {
            console.log(output + " is valid");
        } else {
            console.log(output + " is invalid");
        }
    }
}

validityChecker([3, 0, 0, 4]);