function spyMaster(arr) {
    let specialKeyRegex = new RegExp("(?:\\s|^)" + arr.shift().trim() + "\\s+", "gi");

    for (let i = 0; i < arr.length; i++) {
        let specialKeyArr = arr[i].match(specialKeyRegex);

        if (!specialKeyArr) {
            continue;
        }

        for (let key of specialKeyArr) {
            key = key.trim();
            let regex = new RegExp(`((?:\\s|^)${key}\\s+)([A-Z!%$#]{8,})(\\.|\\,|\\s|$)`, "g");
            arr[i] = arr[i].replace(regex, replacer);
        }
    }

    console.log(arr.join("\n"));

    function replacer(m, gr1, gr2, gr3) {
        gr2 = gr2
            .replace(/!/g, '1')
            .replace(/%/g, '2')
            .replace(/#/g, '3')
            .replace(/\$/g, '4')
            .replace(/[A-Z]/g, x => x.toLowerCase());
        return gr1 + gr2 + gr3;
    }
}

spyMaster([
    'specialKey',
    'In this text the specialKey HELLOWORLD! is correct, but',
    'the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while',
    'SpeCIaLkeY   SOM%%ETH$IN and SPECIALKEY ##$$##$$ are!'
]);