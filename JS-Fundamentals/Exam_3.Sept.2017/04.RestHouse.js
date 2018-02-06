function restHouse(availableRooms, guests) {
    let rooms = new Map();

    for (let currentRoom of availableRooms) {
        let beds = 0;
        if (currentRoom.type === "double-bedded") {
            beds = 2;
        } else {
            beds = 3;
        }
        rooms.set(currentRoom.number, {type: currentRoom.type, beds: beds, guests: []});
    }

    for (let guest of guests) {
        guest.first = {name: guest.first.name, gender: guest.first.gender, age: guest.first.age, set: false};
        guest.second = {name: guest.second.name, gender: guest.second.gender, age: guest.second.age, set: false};
    }

    for (let room of rooms) {

        for (let guest of guests) {

            if (guest.first.set === false && guest.second.set === false &&
                guest.first.gender !== guest.second.gender &&
                room[1].type === "double-bedded" && room[1].beds > 0) {

                rooms.get(room[0]).guests
                    .push({name: guest.first.name, gender: guest.first.gender, age: guest.first.age});
                guest.first.set = true;

                rooms.get(room[0]).guests
                    .push({name: guest.second.name, gender: guest.second.gender, age: guest.second.age});
                guest.second.set = true;

                rooms.get(room[0]).beds -= 2;
            } else if (guest.first.gender === guest.second.gender && room[1].type === "triple" && room[1].beds > 0) {

                if (room[1].guests.length === 0) {

                    if (guest.first.set === false && room[1].beds > 0) {
                        rooms.get(room[0]).guests
                            .push({name: guest.first.name, gender: guest.first.gender, age: guest.first.age});
                        guest.first.set = true;
                        rooms.get(room[0]).beds--;
                    }

                    if (guest.second.set === false && room[1].beds > 0) {
                        rooms.get(room[0]).guests
                            .push({name: guest.second.name, gender: guest.second.gender, age: guest.second.age});
                        guest.second.set = true;
                        rooms.get(room[0]).beds--;
                    }

                } else {

                    if (guest.first.set === false && room[1].guests[0].gender === guest.first.gender && room[1].beds > 0) {
                        rooms.get(room[0]).guests
                            .push({name: guest.first.name, gender: guest.first.gender, age: guest.first.age});
                        guest.first.set = true;
                        rooms.get(room[0]).beds--;
                    }

                    if (guest.second.set === false && room[1].guests[0].gender === guest.second.gender && room[1].beds > 0) {
                        rooms.get(room[0]).guests
                            .push({name: guest.second.name, gender: guest.second.gender, age: guest.second.age});
                        guest.second.set = true;
                        rooms.get(room[0]).beds--;
                    }
                }
            }
        }
    }

    let teaHouse = 0;
    for (let guest of guests) {
        if (guest.first.set === false) {
            teaHouse++;
        }

        if (guest.second.set === false) {
            teaHouse++;
        }
    }

    for (let room of [...rooms].sort()) {
        console.log(`Room number: ${room[0]}`);
        for (let guest of [...room[1].guests].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))) {
            console.log(`--Guest Name: ${guest.name}`);
            console.log(`--Guest Age: ${guest.age}`);
        }
        console.log(`Empty beds in the room: ${room[1].beds}`);
    }
    console.log(`Guests moved to the tea house: ${teaHouse}`);
}

//restHouse([ { number: '101A', type: 'double-bedded' },
//        { number: '104', type: 'triple' },
//        { number: '101B', type: 'double-bedded' },
//        { number: '102', type: 'triple' } ],
//    [ { first: { name: 'Sushi & Chicken', gender: 'female', age: 15 },
//        second: { name: 'Salisa Debelisa', gender: 'female', age: 25 } },
//        { first: { name: 'Daenerys Targaryen', gender: 'female', age: 20 },
//            second: { name: 'Jeko Snejev', gender: 'male', age: 18 } },
//        { first: { name: 'Pesho Goshov', gender: 'male', age: 20 },
//            second: { name: 'Gosho Peshov', gender: 'male', age: 18 } },
//        { first: { name: 'Conor McGregor', gender: 'male', age: 29 },
//            second: { name: 'Floyd Mayweather', gender: 'male', age: 40 } } ]
//);

//restHouse(//
//    [
//        {number: '101A', type: 'double-bedded'},
//        {number: '104', type: 'triple'},
//        {number: '102', type: 'triple'},
//        {number: '202', type: 'triple'}
//    ],
//    [
//        {
//            first: {name: 'Sushi & Chicken', gender: 'female', age: 15},
//            second: {name: 'Salisa Debelisa', gender: 'female', age: 25}
//        },
//        {
//            first: {name: 'Edno', gender: 'female', age: 15},
//            second: {name: 'Dve', gender: 'female', age: 25}
//        },
//        {
//            first: {name: 'Daenerys Targaryen', gender: 'female', age: 20},
//            second: {name: 'Jeko Snejev', gender: 'male', age: 18}
//        },
//        {
//            first: {name: 'Pesho Goshov', gender: 'male', age: 20},
//            second: {name: 'Gosho Peshov', gender: 'male', age: 18}
//        },
//        {
//            first: {name: 'Conor McGregor', gender: 'male', age: 29},
//            second: {name: 'Floyd Mayweather', gender: 'male', age: 40}
//        }
//    ],
//);
restHouse([{number: '206', type: 'double-bedded'},
    {number: '311', type: 'triple'}], [
    {
        first: {name: 'Tanya Popova', gender: 'female', age: 24},
        second: {name: 'Miglena Yovcheva', gender: 'female', age: 23}
    },
    {
        first: {name: 'Katerina Stefanova', gender: 'female', age: 23},
        second: {name: 'Angel Nachev', gender: 'male', age: 22}
    },
    {
        first: {name: 'Katerina Stefanova2', gender: 'female', age: 23},
        second: {name: 'Angel Nachev2', gender: 'male', age: 22}
    },
    {
        first: {name: 'Tatyana Germanova', gender: 'female', age: 23},
        second: {name: 'Boryana Baeva', gender: 'female', age: 22}
    }
]);
