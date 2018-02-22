function result() {
    let argumentsObj = {};

    for (let i = 0; i < arguments.length; i++) {
        let argumentValue = arguments[i];
        let argumentType = typeof argumentValue;

        console.log(`${argumentType}: ${argumentValue}`);

        if (!argumentsObj.hasOwnProperty([argumentType])) {
            argumentsObj[argumentType] = 0;
        }

        argumentsObj[argumentType]++;
    }

    for (let argumentType of Object.keys(argumentsObj)
        .sort((a, b) => argumentsObj[b] - argumentsObj[a])) {
        console.log(`${argumentType} = ${argumentsObj[argumentType]}`);
    }
}


result('cat', 'fd', 42, 420, function () { console.log('Hello world!');});