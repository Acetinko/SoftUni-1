function assignProperties(input) {
    let user = {};
    user[input[0]] = input[1];
    user[input[2]] = input[3];
    user[input[4]] = input[5];

    console.log(user);
}

assignProperties(['name', 'Pesho', 'age', '23', 'gender', 'male']);