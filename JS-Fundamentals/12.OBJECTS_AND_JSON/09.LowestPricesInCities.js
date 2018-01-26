function lowestPricesInCities(arr) {
    let map = new Map();

    for (let i = 0; i < arr.length; i++) {
        let [town, product, price] = arr[i].split(/\s*\|\s*/);

        if (!map.has(product)) {
            map.set(product, new Map());
        }

        map.get(product).set(town, +price);
    }

    for (let [product, townPrice] of map) {

        let lowestPrice = Number.POSITIVE_INFINITY;
        let townLowestPrice = '';

        for (let [town, price] of townPrice) {
            if (price < lowestPrice) {
                lowestPrice = price;
                townLowestPrice = town;
            }
        }

        console.log(`${product} -> ${lowestPrice} (${townLowestPrice})`);
    }
}

lowestPricesInCities([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'
]);

lowestPricesInCities([
    'Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000'
]);