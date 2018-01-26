function systemComponents(arr) {
    let data = new Map();
    for (let i = 0; i < arr.length; i++) {
        let [system, component, subcomponent] = arr[i].split(/\s*\|\s*/);

        if (!data.has(system)) {
            data.set(system, new Map());
        }

        if (!data.get(system).has(component)) {
            data.get(system).set(component, []);
        }

        data.get(system).get(component).push(subcomponent);
    }

    for (let [key, value] of new Map([...data.entries()]
        .sort((a, b) => sortSystem(a, b)))) {

        console.log(key);

        for (let [com, subs] of new Map([...value.entries()]
            .sort((a, b) => b[1].length - a[1].length))) {
            console.log(`|||${com}`);
            subs.forEach(s => console.log(`||||||${s}`));
        }
    }
    
    function sortSystem(a, b) {
        if (a[1].size !== b[1].size) {
            return b[1].size - a[1].size
        }
        return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    }
}

systemComponents([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]);