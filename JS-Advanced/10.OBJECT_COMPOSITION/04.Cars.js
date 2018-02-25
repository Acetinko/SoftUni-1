function cars(commands) {
    let commandsCars = (function () {

        let objects = new Map();

        function create(name) {
            objects.set(name, {});
        }

        function inherit(name, parentName) {
            objects.set(name, Object.create(objects.get(parentName)))
        }

        function set(name, key, value) {
            objects.get(name)[key] = value;
        }

        function print(name) {
            let current = objects.get(name);
            let props = [];

            for (let prop in current) {
                props.push(`${prop}:${current[prop]}`);
            }

            console.log(props.join(', '));
        }

        return {
            create,
            inherit,
            set,
            print
        }
    })();

    for (let arr of commands) {
        let tokens = arr.split(/\s+/g);

        if (tokens.length > 1) {
            if (tokens[2] === "inherit") {
                commandsCars[tokens[2]](tokens[1], tokens[3]);
            } else {
                commandsCars[tokens[0]](tokens[1], tokens[2], tokens[3]);
            }
        } else {
            commandsCars[tokens[0]](tokens[1]);
        }
    }
}

cars([
    'create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    //'print c1',
    'print c2'
]);
