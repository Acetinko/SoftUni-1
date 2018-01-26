function cityMarkets(arr) {
    let townsWithProducts = new Map();
    let pattern = /([ \w]+)\s+->\s+([ \w]+)\s+->\s+([.\d]+)\s+:\s+([.\d]+)/;

    for (let i = 0; i < arr.length; i++) {
        let matchAll = pattern.exec(arr[i]);

        if (matchAll === null) {
            continue;
        }

        let [tmp, town, product, amountOfSales, priceForOneUnit] = matchAll;
        if (!townsWithProducts.has(town)) {
            townsWithProducts.set(town, new Map());
        }

        townsWithProducts.get(town).set(product, Number(amountOfSales * priceForOneUnit));
    }

    for (let [key, value] of townsWithProducts) {
        console.log(`Town - ${key}`);
        for (let [k, v] of value) {
            console.log(`$$$${k} : ${v}`)
        }
    }
}


cityMarkets([
    'Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3'
]);