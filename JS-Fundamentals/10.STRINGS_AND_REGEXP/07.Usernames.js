function usernames(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let [user, domain] = arr[i].split('@');
        result.push(user + '.' +
            domain.split('.')
                .map(e => e[0])
                .join('')
        );
    }

    console.log(result.join(', '));
}

usernames(['peshoo@gmail.com.bg', 'todor_43@mail.dir.bg', 'foo@bar.com']);