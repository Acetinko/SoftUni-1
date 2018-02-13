function airPollution(map, commands) {
    let mapMatrix = [];
    let result = [];

    for (let i = 0; i < map.length; i++) {
        mapMatrix.push(map[i].split(/\s/).map(Number));
    }

    for (let i = 0; i < commands.length; i++) {
        let [command, number] = commands[i].split(' ');
        number = Number(number);

        for (let mapMatrixRow = 0; mapMatrixRow < mapMatrix.length; mapMatrixRow++) {
            for (let mapMatrixCol = 0; mapMatrixCol < mapMatrix[mapMatrixRow].length; mapMatrixCol++) {
                let currentelemet = mapMatrix[mapMatrixRow][mapMatrixCol];

                if (command === "breeze" && number === mapMatrixRow) {
                    if (currentelemet - 15 > 0) {
                        mapMatrix[mapMatrixRow][mapMatrixCol] = currentelemet - 15;
                    }

                } else if (command === "gale" && number === mapMatrixCol) {
                    if (currentelemet - 20 > 0) {
                        mapMatrix[mapMatrixRow][mapMatrixCol] = currentelemet - 20;
                    }
                } else if (command === "smog") {
                    mapMatrix[mapMatrixRow][mapMatrixCol] = currentelemet + number;
                }
            }
        }
    }

    for (let mapMatrixRow = 0; mapMatrixRow < mapMatrix.length; mapMatrixRow++) {
        for (let mapMatrixCol = 0; mapMatrixCol < mapMatrix[mapMatrixRow].length; mapMatrixCol++) {
            let currentelemet = mapMatrix[mapMatrixRow][mapMatrixCol];

            if (currentelemet >= 50) {
                result.push(`[${mapMatrixRow}-${mapMatrixCol}]`);
            }
        }
    }

    if (result.length > 0) {
        console.log('Polluted areas: ' + result.join(', '));
    } else {
        console.log('No polluted areas');
    }
}

airPollution(
    [
        "5 7 72 14 4",
        "41 35 37 27 33",
        "23 16 27 42 12",
        "2 20 28 39 14",
        "16 34 31 10 24",
    ],
    ["breeze 1", "gale 2", "smog 25"]
);

airPollution([
        "5 7 3 28 32",
        "41 12 49 30 33",
        "3 16 20 42 12",
        "2 20 10 39 14",
        "7 34 4 27 24",
    ],
    [
        "smog 11", "gale 3",
        "breeze 1", "smog 2"
    ]
);

airPollution([
        "5 7 2 14 4",
        "21 14 2 5 3",
        "3 16 7 42 12",
        "2 20 8 39 14",
        "7 34 1 10 24",
    ],
    ["breeze 1", "gale 2", "smog 35"]
);