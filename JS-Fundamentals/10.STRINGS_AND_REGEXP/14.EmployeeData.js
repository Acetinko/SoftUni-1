function employeeData(arr) {
    let pattern = /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([a-zA-Z0-9 -]+)$/;

    for (let str of arr) {
        let match = pattern.exec(str);
        if (match === null) {
            continue;
        }

        let [all, name, salary, position  ] = match;
        console.log(`Name: ${name}`);
        console.log(`Position: ${position}`);
        console.log(`Salary: ${salary}`);
    }
}

employeeData([
    ' ',
    'Isacc - 1000 - CEO',
    'Ivan - 500 - Employee',
    'Peter - 500 - Employee'
]);