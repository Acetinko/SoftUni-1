function listProcessor(commands) {
    
    let commandProcessor = (function () {
        let result = [];

        function add(str) {
            result.push(str);
        }

        function remove(str) {
            result = result.filter(e => e !== str);
        }

        function print() {
            console.log(result.toString());
        }

        return {
            add,
            remove,
            print
        }
    })();

    for (let command of commands) {
        let [commandName, name] = command.split(/\s+/g);
        commandProcessor[commandName](name);
    }
}


listProcessor(['add hello', 'add again', 'remove hello', 'add again', 'print']);
listProcessor(['add pesho', 'add gosho', 'add pesho', 'remove pesho', 'print']);
