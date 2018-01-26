function cappyJuice(arr) {
    let data = new Map();
    let printData = new Map();

    for (let i = 0; i < arr.length; i++) {
        let [name, quantity] = arr[i].split(/\s*=>\s*/);

        if (!data.has(name)) {
            data.set(name, 0)
        }

        data.set(name, data.get(name) + +quantity);

        if (parseInt(data.get(name) / 1000) > 0) {
            printData.set(name, parseInt(data.get(name) / 1000));
        }
    }

    [...printData].forEach(x => console.log(`${x[0]} => ${x[1]}`));
}

cappyJuice([
    'Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789',
]);

cappyJuice([
    'Orange => 2000',
    //'Orange => 1000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549'
]);

