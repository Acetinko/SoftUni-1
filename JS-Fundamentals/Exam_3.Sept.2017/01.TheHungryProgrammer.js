function theHungryProgrammer(portionsOfMeals, commands) {
    let countEat = 0;

    for (let i = 0; i < commands.length; i++) {
        let tokens = commands[i].split(' ');
        let [command, index1, index2] = tokens;

        if (command === "Serve" && tokens.length === 1) {
            if (portionsOfMeals.length > 0) {
                console.log(`${portionsOfMeals[portionsOfMeals.length - 1]} served!`);
                portionsOfMeals.splice(portionsOfMeals.length - 1, 1);
            }
        } else if (command === "Eat" && tokens.length === 1) {
            if (portionsOfMeals.length > 0) {
                console.log(`${portionsOfMeals[0]} eaten`);
                countEat++;
                portionsOfMeals.splice(0, 1);
            }
        } else if (command === "Add" && tokens.length === 2) {
            portionsOfMeals.unshift(index1);
        } else if (command === "Consume" && tokens.length === 3) {
            if (portionsOfMeals.length >= index1 && index2 < portionsOfMeals.length) {
                for (let i = index1; i <= index2; i++) {
                    portionsOfMeals.splice(i, 1);
                    i--;
                    index2--;
                    countEat++;
                }
                console.log("Burp!");
            }
        } else if (command === "Shift" && tokens.length === 3) {
            if (portionsOfMeals.length >= index1 && index2 < portionsOfMeals.length) {
                let newIndex1 = portionsOfMeals[index2];
                let newIndex2 = portionsOfMeals[index1];
                portionsOfMeals[index1] = newIndex1;
                portionsOfMeals[index2] = newIndex2;
            }
        } else if (command === "End" && tokens.length === 1) {
            break;
        }
    }

    if (portionsOfMeals.length > 0){
        console.log(`Meals left: ${portionsOfMeals.join(', ')}`);
    } else {
        console.log("The food is gone");
    }
    console.log(`Meals eaten: ${countEat}`);
}

theHungryProgrammer(['carrots', 'apple', 'beet'],
    ['Consume 0 2',
        'End',]

);