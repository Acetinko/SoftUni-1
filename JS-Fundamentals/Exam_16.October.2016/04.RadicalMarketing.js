function radicalMarketing(arr) {
    let peopleWithSubscribe = new Map();
    let personSubscribedCount = new Map();

    for (let kvp of arr) {
        let tokens = kvp.split('-');

        if (tokens.length === 1 && !peopleWithSubscribe.has(tokens[0])) {
            peopleWithSubscribe.set(tokens[0], new Set());
        } else if (tokens.length === 2 && peopleWithSubscribe.has(tokens[1])) {

            if (!personSubscribedCount.has(tokens[0])) {
                personSubscribedCount.set(tokens[0], 1)
            } else if (!peopleWithSubscribe.get(tokens[1]).has(tokens[0])) {
                personSubscribedCount.set(tokens[0], personSubscribedCount.get(tokens[0]) + 1);
            }

            peopleWithSubscribe.get(tokens[1]).add(tokens[0]);
        }
    }

    let result = Array.from(peopleWithSubscribe.entries()).sort(sortResult);
    let count = 0;

    console.log(result[0][0]);
    for (let value of result[0][1]) {
        console.log(`${++count}. ${value}`);
    }

    function sortResult(a, b) {
        let result = b[1].size - a[1].size;
        if (result === 0) {
            return personSubscribedCount.get(b[0]) - personSubscribedCount.get(a[0]);
        }
        return result;
    }
}

radicalMarketing([
    'A',
    'A',
    'B',
    'C',
    'D',
    'A-B',
    'A-B',
    'B-A',
    'C-A',
    'C-A',
    'D-A',
    'F-C',
    'C-D',
]);