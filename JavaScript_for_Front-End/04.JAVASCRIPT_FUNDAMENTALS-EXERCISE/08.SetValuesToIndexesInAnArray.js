function setValuesToIndexesInAnArray(input) {
    let n = Number(input[0]);
    let result = [];
    result.length = n;

    for (let i = 0; i < n; i++) {
        for (let z = 1; z < input.length; z++) {
            let elemets = input[z].split(" - ");
            result[Number(elemets[0])] = Number(elemets[1]);
        }
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i] === undefined) {
            console.log(0);
            continue;
        }
        console.log(result[i]);
    }
}

setValuesToIndexesInAnArray([ '3', '0 - 5', '1 - 6', '2 - 7' ]);
setValuesToIndexesInAnArray([ '2', '0 - 5', '0 - 6', '0 - 7' ]);
setValuesToIndexesInAnArray([ '5', '0 - 3', '3 - -1', '4 - 2' ]);