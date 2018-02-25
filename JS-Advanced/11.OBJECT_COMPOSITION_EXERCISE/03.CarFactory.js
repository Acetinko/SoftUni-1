function carFactory(car) {
    let result = {
        model: car.model,
        engine: {},
        carriage: {
            type: car.carriage,
            color: car.color
        },
        wheels: []
    };

    if (car.power <= 90) {
        result.engine = {
            power: 90,
            volume: 1800
        };
    } else if (car.power <= 120) {
        result.engine = {
            power: 120,
            volume: 2400
        };
    } else if (car.power <= 200) {
        result.engine = {
            power: 200,
            volume: 3500
        };
    }

    if (car.wheelsize % 2 === 0) {
        for (let i = 0; i < 4; i++) {
            result.wheels.push(car.wheelsize  - 1);
        }
    } else {
        for (let i = 0; i < 4; i++) {
            result.wheels.push(car.wheelsize);
        }
    }

    return result;
}

//console.log(carFactory({
//    model: 'VW Golf II',
//    power: 90,
//    color: 'blue',
//    carriage: 'hatchback',
//    wheelsize: 14
//}));
//
//console.log(carFactory({
//    model: 'Opel Vectra',
//    power: 110,
//    color: 'grey',
//    carriage: 'coupe',
//    wheelsize: 17
//}));

console.log(carFactory({
    model: 'Ferrari',
    power: 200,
    color: 'red',
    carriage: 'coupe',
    wheelsize: 21
}));//