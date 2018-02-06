function jansNotation(arr) {
    let numbers = [];

    for (let current of arr) {

        if (Number.isInteger(current)) {
            numbers.push(current);
        } else {

            if (numbers.length > 1) {
                let num1 = numbers.pop();
                let num2 = numbers.pop();

                switch (current) {
                    case "+":
                        numbers.push(num2 + num1);
                        break;
                    case "-":
                        numbers.push(num2 - num1);
                        break;
                    case "*":
                        numbers.push(num2 * num1);
                        break;
                    case "/":
                        numbers.push(num2 / num1);
                        break;
                    default:
                        break;
                }

            } else {
                console.log(`Error: not enough operands!`);
                return;
            }
        }
    }

    if (numbers.length > 1) {
        console.log("Error: too many operands!");
    } else {
        console.log(numbers.join());
    }
}

jansNotation([31,
    2,
    '+',
    11,
    '/']
);