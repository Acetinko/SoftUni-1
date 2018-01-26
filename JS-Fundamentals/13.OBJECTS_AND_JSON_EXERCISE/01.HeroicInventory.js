function heroicInventory(arr) {
    let data = [];

    for (let i = 0; i < arr.length; i++) {
        let tokens = arr[i].split(/\s*\/\s*/);
        let [name, level, strItems] = tokens;
        let items = [];

        if (tokens.length === 3) {
            items = strItems.trim().split(', ');
        }

        data.push({name: name.trim(), level: +level, items: items});
    }

    console.log(JSON.stringify(data));
}

heroicInventory([
    'IsaccWW / 25 /',
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]);