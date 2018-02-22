function euclidsAlgorithm(a, b) {
    return gcd(a, b);

    function gcd(a, b) {
        if (b === 0) {
            return a;
        } else {
            return gcd(b, a % b);
        }
    }
}

console.log(euclidsAlgorithm(252, 105));