function gameOfEpicness(inputArrayOfKingdoms, inputMatrix) {
    let kingdoms = new Map();

    for (let obj of inputArrayOfKingdoms) {

        if (!kingdoms.has(obj.kingdom)) {
            kingdoms.set(obj.kingdom, new Map());
        }

        if (!kingdoms.get(obj.kingdom).has(obj.general)) {
            kingdoms.get(obj.kingdom).set(obj.general, 0);
        }

        kingdoms.get(obj.kingdom).set(obj.general,
            kingdoms.get(obj.kingdom).get(obj.general) + +obj.army
        );
    }

    let attacking = {};
    let defending = {};
    let kingdomsWinsLoss = new Map();

    for (let i = 0; i < inputMatrix.length; i++) {
        let arr = inputMatrix[i];
        if (arr.length !== 4) {
            continue;
        }

        attacking = {kingdom: arr[0], general: arr[1], army: -1};
        defending = {kingdom: arr[2], general: arr[3], army: -1};

        if (!kingdoms.has(attacking.kingdom) || !kingdoms.has(defending.kingdom)) {
            continue;
        }
        if (!kingdoms.get(attacking.kingdom).has(attacking.general) ||
            !kingdoms.get(defending.kingdom).has(defending.general)) {
            continue;
        }

        if (attacking.kingdom === defending.kingdom)  {
            continue;
        }

        attacking.army = kingdoms.get(attacking.kingdom).get(attacking.general);
        defending.army = kingdoms.get(defending.kingdom).get(defending.general);


        if (attacking.army === -1 || defending.army === -1) {
            continue;
        }

        if (!kingdomsWinsLoss.has(attacking.kingdom)) {
            kingdomsWinsLoss.set(attacking.kingdom, new Map());
        }
        if (!kingdomsWinsLoss.get(attacking.kingdom).has(attacking.general)) {
            kingdomsWinsLoss.get(attacking.kingdom).set(attacking.general, [0, 0, 0])
        }

        if (!kingdomsWinsLoss.has(defending.kingdom)) {
            kingdomsWinsLoss.set(defending.kingdom, new Map());
        }
        if (!kingdomsWinsLoss.get(defending.kingdom).has(defending.general)) {
            kingdomsWinsLoss.get(defending.kingdom).set(defending.general, [0, 0, 0])
        }

        if (attacking.army > defending.army) {
            if ( attacking.army > 0) {
                attacking.army += (attacking.army * 0.10);
                kingdoms.get(attacking.kingdom)
                    .set(attacking.general, attacking.army);
                kingdomsWinsLoss.get(attacking.kingdom).get(attacking.general)[0]++;

            }

            if (defending.army > 0) {
                defending.army -= (defending.army * 0.10);
                kingdoms.get(defending.kingdom)
                    .set(defending.general, defending.army);
                kingdomsWinsLoss.get(defending.kingdom).get(defending.general)[1]++;
            }

        } else if (attacking.army < defending.army) {

            if (attacking.army > 0) {
                attacking.army -= (attacking.army * 0.10);

                kingdoms.get(attacking.kingdom)
                    .set(attacking.general, attacking.army);
                kingdomsWinsLoss.get(attacking.kingdom).get(attacking.general)[1]++;

            }

            if (defending.army > 0) {
                defending.army += (defending.army * 0.10);
                kingdoms.get(defending.kingdom)
                    .set(defending.general, defending.army);
                kingdomsWinsLoss.get(defending.kingdom).get(defending.general)[0]++;
            }


        }
    }

    let king = new Map();
    for (let kvp of kingdomsWinsLoss) {
        if (!king.has(kvp[0])) {
            king.set(kvp[0], [0, 0])
        }
        let sortGenerate = [...kvp[1]].sort((a, b) => a[1][0] - b[1][0]);

        let sumWins = 0;
        let sumLosses = 0;

        for (let obj of sortGenerate) {

            sumWins += obj[1][0];
            sumLosses += obj[1][1];
        }
        king.get(kvp[0])[0] += sumWins;
        king.get(kvp[0])[1] += sumLosses;
    }

    let kingName = [...king].sort(sortKing)[0];

    let count = 0;
    for (let kvp of [...kingdomsWinsLoss.get(kingName[0])].sort((a, b) => a[1][0] - b[1][0])) {
        if (count === 0) {
            console.log(`Winner: ${kingName[0]}`);
        }
        let army = Math.round(kingdoms.get(kingName[0]).get(kvp[0]));
        console.log(`/\\general: ${kvp[0]}`);
        console.log(`---army: ${army}`);
        console.log(`---wins: ${kvp[1][0]}`);
        console.log(`---losses: ${kvp[1][1]}`);
        count++;
    }

    function sortKing(a, b) {
        let sortFirst = b[1][0] - a[1][0];
        let sortSecond = a[1][1] - b[1][1];

        if (sortFirst !== 0) {
            return sortFirst;
        }
        return sortSecond;
    }
}

gameOfEpicness([
        {kingdom: "Maiden Way", general: "Merek", army: 5000},
        {kingdom: "Stonegate", general: "Ulric", army: 4900},
        {kingdom: "Stonegate", general: "Doran", army: 70000},
        {kingdom: "YorkenShire", general: "Quinn", army: 0},
        {kingdom: "YorkenShire", general: "Quinn", army: 2000},
        {kingdom: "Maiden Way", general: "Berinon", army: 100000}],
    [["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"]]
);

gameOfEpicness([ { kingdom: "Stonegate", general: "Ulric", army: 5000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 5000 },
        { kingdom: "Maiden Way", general: "Berinon", army: 1000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Maiden Way", "Berinon", "YorkenShire", "Quinn"] ]
);

gameOfEpicness([ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Doran"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"] ]
);