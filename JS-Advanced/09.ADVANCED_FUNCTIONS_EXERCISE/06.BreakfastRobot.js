let breakfastRobot = function () {
    let robot = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    let products = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        coke: {
            carbohydrate: 10,
            flavour: 20
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        omelet: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        cheverme: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    };

    return function (inputStr) {
        let inputData = inputStr.split(' ');
        let command = inputData[0];

        if (command === "restock") {
            let microElement = inputData[1];
            robot[microElement] += Number(inputData[2]);
            return "Success";
        } else if (command === "report") {
            return `protein=${robot.protein} carbohydrate=${robot.carbohydrate} fat=${robot.fat} flavour=${robot.flavour}`;
        } else if (command === "prepare") {
            let selectedProduct = inputData[1];
            let selectedProductQty = Number(inputData[2]);
            let currentProductStats = products[selectedProduct];

            for (let microElement in currentProductStats) {
                if (currentProductStats.hasOwnProperty(microElement)) {
                    let microElementQty = currentProductStats[microElement];
                    if (robot[microElement] < microElementQty * selectedProductQty) {
                        return `Error: not enough ${microElement} in stock`;
                    }
                }
            }

            for (let microElement in currentProductStats) {
                if (currentProductStats.hasOwnProperty(microElement)) {
                    let microElementQty = currentProductStats[microElement];
                    robot[microElement] -= microElementQty * selectedProductQty;
                }
            }
            return "Success";
        }
    }
};
breakfastRobot = breakfastRobot();
//console.log(breakfastRobot('restock carbohydrate 10'));
//console.log(breakfastRobot('restock flavour 10'));
//console.log(breakfastRobot('prepare apple 1'));
//console.log(breakfastRobot('restock fat 10'));
//console.log(breakfastRobot('prepare burger 1'));
//console.log(breakfastRobot('report'));

console.log(breakfastRobot("prepare cheverme 1"));
console.log(breakfastRobot("restock protein 10"));
console.log(breakfastRobot("prepare cheverme 1"));
console.log(breakfastRobot("restock carbohydrate 10"));
console.log(breakfastRobot("prepare cheverme 1"));
console.log(breakfastRobot("restock fat 10"));
console.log(breakfastRobot("prepare cheverme 1"));
console.log(breakfastRobot("restock flavour 10"));
console.log(breakfastRobot("prepare cheverme 1"));
console.log(breakfastRobot("report"));