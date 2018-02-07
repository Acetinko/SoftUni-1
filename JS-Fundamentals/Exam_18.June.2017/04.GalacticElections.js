function galacticElections(ballots) {
    let election = new Map();

    for (let ballot of ballots) {
        if (!election.has(ballot.system)) {
            election.set(ballot.system, new Map());
        }

        if (!election.get(ballot.system).has(ballot.candidate)) {
            election.get(ballot.system).set(ballot.candidate, 0);
        }

        election.get(ballot.system).set(ballot.candidate,
            election.get(ballot.system).get(ballot.candidate) + ballot.votes
        );
    }

    let result = new Map();
    for (let [key, kvp] of [...election]
        .map(([k, v]) => [k, [...v]
            .sort((a, b) => b[1] - a[1])
            .reduce((a, b) => [a[0], a[1] + b[1]])])) {

        if (!result.has(kvp[0])) {
            result.set(kvp[0], new Map());
        }

        result.get(kvp[0]).set(key, kvp[1]);
    }

    let count = 0;
    for (let [key, kvp] of [...result.entries()]
        .sort((a, b) => a[0].length - b[0].length)
        .map(([k, v]) => [k, [...v]
            .sort((a, b) => b[1] - a[1])])) {

        if (result.size > 1) {

            if (count === 0) {
                console.log(`${key} wins with ${kvp[count][1]} votes`);
            } else {
                console.log(`Runner up: ${key}`);
                [...kvp.entries()].forEach((kvp) => console.log(`${kvp[1][0]}: ${kvp[1][1]}`))
                break;
            }

        } else {
            console.log(`${key} wins with ${kvp.reduce((a, b) => [a[0], a[1] + b[1]])[1]} votes`);
            console.log(`${key} wins unopposed!`);
        }

        count++;
    }
}

galacticElections([ { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
    { system: 'Sigma', candidate: 'Space Cow',     votes: 200 },
    { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
    { system: 'Tau',   candidate: 'Space Cow',     votes: 15 },
    { system: 'Sigma', candidate: 'Space Cow',     votes: 60 },
    { system: 'Tau',   candidate: 'Flying Shrimp', votes: 150 } ]
);
//
//galacticElections([ { system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
//    { system: 'Tau',   candidate: 'Kim Jong Andromeda', votes: 200 },
//    { system: 'Tau',   candidate: 'Flying Shrimp',      votes: 150 } ]
//);

galacticElections([ { system: 'Tau',     candidate: 'Flying Shrimp', votes: 150 },
    { system: 'Tau',     candidate: 'Space Cow',     votes: 100 },
    { system: 'Theta',   candidate: 'Space Cow',     votes: 10 },
    { system: 'Sigma',   candidate: 'Space Cow',     votes: 200 },
    { system: 'Sigma',   candidate: 'Flying Shrimp', votes: 75 },
    { system: 'Omicron', candidate: 'Flying Shrimp', votes: 50 },
    { system: 'Omicron', candidate: 'Octocat',       votes: 75 } ]
);