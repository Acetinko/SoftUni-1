function cookingByNumbers(arr) {
    let number = Number(arr[0]);
    let output = "";

    for (let i = 1; i < arr.length; i++) {
        number = getOperation(arr[i], number);
        output += `${number}\n`;
    }

    return output;

    function getOperation(operation, number) {
        switch (operation) {
            case "chop":
                return number / 2;
            case "dice":
                return Math.sqrt(number);
            case "spice":
                return ++number;
            case "bake":
                return number * 3;
            case "fillet":
                return number - (number * 0.2);
        }
    }
}

console.log(cookingByNumbers([32, "chop", "chop", "chop", "chop", "chop"]));
console.log(cookingByNumbers([9, "dice", "spice", "chop", "bake", "fillet"]));
