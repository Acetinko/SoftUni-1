function townsToJSON(arr) {
    let result = [];

    for (let i = 1; i < arr.length; i++) {
        let [empty, town, latitude, longitude] = arr[i]
            .split('|')
            .map(e => e.trim());

        let obj = {
            Town:town,
            Latitude: Number(latitude),
            Longitude: Number(longitude)
        };

        result.push(obj);
    }

    console.log(JSON.stringify(result));
}

townsToJSON([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |'
]);