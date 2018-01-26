function storeCatalogue(arr) {
    let data = new Map();

    for (let i = 0; i < arr.length; i++) {
        let [name, price] = arr[i].split(/\s*:\s*/);
        data.set(name, +price);
    }

    let ch = '';
    for (let [name, price] of new Map([...data.entries()].sort())) {
        if (ch !== name[0]) {
            ch = name[0];
            console.log(ch);
        }
        console.log(`\t${name}: ${price}`);
    }
}


storeCatalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);


storeCatalogue([
    'Banana : 2',
    'Rubic\'s Cube : 5',
    'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10'
]);