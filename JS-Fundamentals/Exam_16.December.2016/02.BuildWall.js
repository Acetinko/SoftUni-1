function buildWall(arr) {
    arr = arr.map(Number);

    let concrete = [];

    while (true) {
        let isBuildOn = false;
        let dailyConcrete = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < 30) {
                dailyConcrete += 195;
                arr[i]++;
                isBuildOn = true;
            }
        }

        if (!isBuildOn) {
            break;
        } else {
            concrete.push(dailyConcrete);
        }
    }

    let sum = concrete.reduce((a, b) => a + b) * 1900;
    console.log(concrete.join(', '));
    console.log(`${sum} pesos`);
}

buildWall(['21', '25', '28']);