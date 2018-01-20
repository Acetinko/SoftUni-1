function addAndRemoveElementsFromArray(arrStr) {
    let arr = [];

    for (let i = 0; i < arrStr.length; i++) {
        op(arrStr[i], arr, i);
    }

    console.log(arr.length > 0 ? arr.join('\n'): "Empty");

    function op(command, arr, i) {
        switch (command) {
            case "add":
                return arr.length > 0 ? arr.push(i + 1):arr.push(i + 1);
            case "remove":
               return arr.length > 0 ? arr.pop(): arr.length = 0;
        }
    }
}

addAndRemoveElementsFromArray(["add",
    "add",
    "remove",
    "add",
    "add"
]);