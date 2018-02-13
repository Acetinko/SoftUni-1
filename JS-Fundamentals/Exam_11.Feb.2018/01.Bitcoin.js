function bitcoinMining(arr) {

    let countBitcoints = 0;
    let firstBitcoin = 0;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let num = Number(arr[i]);

        if ((i + 1) % 3 === 0) {
            sum += (num - (num * 0.30)) * 67.51;
        } else {
            sum += num * 67.51;
        }

        while (sum > 11949.16) {
            if (countBitcoints === 0) {
                firstBitcoin = i + 1;
            }

            sum -= 11949.16;
            countBitcoints++;
        }
    }


    console.log(`Bought bitcoins: ${countBitcoints}`);
    if (firstBitcoin > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstBitcoin}`);
    }
    console.log(`Left money: ${sum.toFixed(2)} lv.`);
}

//bitcoinMining([100, 200, 300]);
//bitcoinMining([50, 100]);
bitcoinMining([3124.15, 504.212, 2511.124]);