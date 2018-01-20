function lastK_NumbersSequence(n, k) {
    let seq = [1];

    for (let current = 1; current < n; current++) {
        let start = Math.max(0, current - k);

        seq[current] = seq.slice(start, current).reduce((a, b) => a + b, 0);
    }

    console.log(seq.join(' '));
}

lastK_NumbersSequence(9, 5);