function result(objInput) {

    try {
        if (objInput.method.match(/(^GET$)|(^POST$)|(^DELETE$)|(^CONNECT$)/g) === null) {
            throw new Error("Invalid request header: Invalid Method");
        }
    } catch (ex) {
        throw new Error("Invalid request header: Invalid Method");
    }

    try {
        if (objInput.uri.match(/^([a-zA-Z\d\-\.]+)$/g) === null) {
            throw new Error("Invalid request header: Invalid URI");
        }
    } catch (ex) {
        throw new Error("Invalid request header: Invalid URI");
    }

    try {
        if (objInput.version.match(/(\HTTP\/0.9\b)|(\bHTTP\/1.0\b)|(\bHTTP\/1.1\b)|(\bHTTP\/2.0\b)/g) === null) {
            throw new Error("Invalid request header: Invalid Version");
        }
    } catch (ex) {
        throw new Error("Invalid request header: Invalid Version");
    }

    try {
        if (objInput.message !== '') {
            if (objInput.message.match(/^[^\<\>\\\&\'\"]+$/g) === null) {
                throw new Error("Invalid request header: Invalid Message");
            }
        }
    } catch (ex) {
        throw new Error("Invalid request header: Invalid Message");
    }

    return(objInput);
}

let valid = result({
    method: 'GET ',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
});

console.log(valid);

//console.log(validateRequest({
///    method: 'POST',
//    uri: 'home.bash',
//    message: 'rm -rf /*'
//}));

//validateRequest({
//    method: 'GET',
//    uri: 'svn.public.catalog',
//    version: 'HTTP/1.1',
//    message: ''
//});

//validateRequest({
//    method: 'OPTIONS',
//    uri: 'git.master',
//    version: 'HTTP/1.1',
//    message: '-recursive'
//});
