function usernames(arr) {
    let users = new Set();

    for (let user of arr) {
        users.add(user);
    }

    for (let user of new Set([...users]
        .sort((a, b) => sortUsers(a, b)))) {
        console.log(user);
    }

    function sortUsers(a, b) {
        if (a.length !== b.length) {
            return a.length - b.length;
        }
        return a.localeCompare(b);
    }
}

usernames([
    'Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot'
]);