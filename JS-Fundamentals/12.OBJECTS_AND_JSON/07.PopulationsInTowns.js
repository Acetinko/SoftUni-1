function populationsInTowns(arr) {
    let result = new Map();
    for (let value of arr) {
        let split = value.split(/\s*[<\->]\s*/g)
            .filter(e => e !== '');
        result.has(split[0]) ?
            result.set(split[0], Number(split[1]) + result.get(split[0])) :
            result.set(split[0], Number(split[1]));
    }
    [...result].forEach(arr => console.log(`${arr[0]} : ${arr[1]}`))
}

populationsInTowns(['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']
);

populationsInTowns([
    'Istanbul <-> 100000',
    'Honk Kong <-> 2100004',
    'Jerusalem <-> 2352344',
    'Mexico City <-> 23401925',
    'Istanbul <-> 1000',
]);