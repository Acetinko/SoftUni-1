function spiceMustFlow(arr) {
    let currentYield = Number(arr[0]);
    let extractedSpice = 0;
    let days = 0;

    while (currentYield >= 100) {
        extractedSpice += currentYield - 26;
        days++;
        currentYield -= 10;
    }

    if (extractedSpice >= 26) {
        extractedSpice -= 26;
    }

    console.log(days);
    console.log(extractedSpice);
}

spiceMustFlow([111]);