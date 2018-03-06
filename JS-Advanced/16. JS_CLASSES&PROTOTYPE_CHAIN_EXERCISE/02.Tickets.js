function tickets(arrStr, sortingCriteria) {

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    let arrTickets = [];

    for (let str of arrStr) {
        let [destination, price, status] = str.split('|');
        arrTickets.push(new Ticket(destination, price, status));
    }

    switch (sortingCriteria){
        case 'destination':
            return  arrTickets.sort((a, b) => a.destination.localeCompare(b.destination));
        case 'price':
            return arrTickets.sort((a, b) => a.price - b.price);
        case 'status':
            return arrTickets.sort((a, b) => a.status.localeCompare(b.status));
        default:
            return arrTickets;
    }
}


console.log(tickets(
    [
        'Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'
    ],
    'destination'
));
