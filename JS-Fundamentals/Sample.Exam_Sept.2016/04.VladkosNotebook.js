function vladkosNotebook(arr) {
    let players = {};
    for (let obj of arr) {
        let tokens = obj.split('|');
        let color = tokens[0];

        if (!players.hasOwnProperty(color)) {
            players[color] = {
                wins: 1,
                losses: 1,
                opponents: []
            };
        }

        switch (tokens[1]) {
            case "name":
                players[color]['name'] = tokens[2];
                break;
            case "age":
                players[color]['age'] = tokens[2];
                break;
            case "win":
                players[color]['wins']++;
                players[color]['opponents'].push(tokens[2]);
                break;
            case "loss":
                players[color]['losses']++;
                players[color]['opponents'].push(tokens[2]);
                break;
        }
    }

    let outputObj = {};

    for(let color of Object.keys(players).sort()) {
        if (players[color].name !== undefined && players[color].age !== undefined) {
            outputObj[color] = {
                age: players[color].age,
                name: players[color].name,
                opponents: players[color].opponents.sort(),
                rank: (players[color].wins / players[color].losses).toFixed(2)
            }
        }
    }

    console.log(JSON.stringify(outputObj));
}

vladkosNotebook([
    'purple|age|99',
    'red|age|44',
    'blue|win|pesho',
    'blue|win|mariya',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Yana',
    'purple|loss|Yana',
    'purple|loss|Manov',
    'purple|loss|Manov',
    'red|name|gosho',
    'blue|win|Vladko',
    'purple|loss|Yana',
    'purple|name|VladoKaramfilov',
    'blue|age|21',
    'test|name|PERO',
    'blue|loss|Pesho]'
]);