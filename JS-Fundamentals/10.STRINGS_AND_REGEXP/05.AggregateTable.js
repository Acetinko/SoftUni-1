function aggregateTable(arr) {
    let cities = [];
    let number = 0;

    for (let i = 0; i < arr.length; i++) {
        let citiesNumber = arr[i]
            .split('|')
            .map(e => e.trim())
            .filter(e => e.trim());

        cities.push(citiesNumber[0]);
        number += Number(citiesNumber[1]);
    }

    console.log(cities.join(', '));
    console.log(number);
}

aggregateTable(['| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
);