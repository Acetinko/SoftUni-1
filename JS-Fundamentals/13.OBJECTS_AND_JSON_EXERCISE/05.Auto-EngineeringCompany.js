function autoEngineeringCompany(arr) {
    let data = new Map();
    for (let i = 0; i < arr.length; i++) {
        let [brand, model, produced] = arr[i].split(/\s*\|\s*/);

        if (!data.has(brand)) {
            data.set(brand, new Map());
        }

        !data.get(brand).has(model) ?
            data.get(brand).set(model, +produced) :
            data.get(brand).set(model, data.get(brand).get(model) + +produced);
    }

    [...data].forEach(b => (console.log(b[0]), b[1]
            .forEach((p, m) => console.log(`###${m} -> ${p}`))));
}

autoEngineeringCompany([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);