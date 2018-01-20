function treasureLocator(arr) {

    printResult(arr);

    function isTokelau(x, y) {
        return isTreasure(x, y, 8, 9, 0, 1);
    }

    function isTuvalu(x, y) {
        return isTreasure(x, y, 1, 3, 1, 3);
    }

    function isSamoa(x, y) {
        return isTreasure(x, y, 5, 7, 3, 6);
    }

    function isTonga(x, y) {
        return isTreasure(x, y, 0, 2, 6, 8);
    }

    function isCook(x, y) {
        return isTreasure(x, y, 4, 9, 7, 8);
    }

    function isTreasure(x, y, minX, maxX, minY, maxY) {
        let isX = false, isY = false;

        if (x >= minX && x <= maxX) {
            isX = true;
        }

        if (y >= minY && y <= maxY) {
            isY = true;
        }

        return isX && isY;
    }

    function printResult(arr) {
        for (let i = 0; i < arr.length; i += 2) {
            let [x, y] = [arr[i], arr[i + 1]];

            if (isTokelau(x, y)) {
                console.log("Tokelau");
            } else if (isTuvalu(x, y)) {
                console.log("Tuvalu");
            } else if (isSamoa(x, y)) {
                console.log("Samoa");
            } else if (isTonga(x, y)) {
                console.log("Tonga");
            } else if (isCook(x, y)) {
                console.log("Cook");
            } else {
                console.log("On the bottom of the ocean");
            }
        }
    }
}

treasureLocator([4, 2, 1.5, 6.5, 1, 3]);