function simpleEmailValidation(email) {
    let regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/g;

    if (regex.test(email)) {
        console.log('Valid');
    } else {
        console.log('Invalid');
    }
}

simpleEmailValidation('valid@email.bg');
simpleEmailValidation('invalid@emai1.bg');