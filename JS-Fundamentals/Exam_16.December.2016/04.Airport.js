function airport(arr) {
    let airport = new Map();
    let townStatistic = new Map();
    let townPlanes = new Map();

    for (let dataRow of arr) {
        let [planeID, town, passengersCount, action] = dataRow.split(/\s+/g);
        passengersCount = Number(passengersCount);

        if (action === 'land') {
            if (airport.has(planeID)) {
                continue;
            }

            airport.set(planeID, 'land');

            if (!townStatistic.has(town)) {
                townStatistic.set(town, [0, 0]);
            }

            if (!townPlanes.has(town)) {
                townPlanes.set(town, new Set());
            }

            townStatistic.get(town)[0] += passengersCount;
            townPlanes.get(town).add(planeID);
        } else {
            if (!airport.has(planeID)) {
                continue;
            }

            airport.delete(planeID);

            if (!townStatistic.has(town)) {
                townStatistic.set(town, [0, 0]);
            }

            if (!townPlanes.has(town)) {
                townPlanes.set(town, new Set());
            }

            townStatistic.get(town)[1] += passengersCount;
            townPlanes.get(town).add(planeID);
        }
    }

    let sortedAirport = [...airport.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]));
    console.log("Planes left:");
    sortedAirport.forEach(pId => console.log(`- ${pId[0]}`));

    let sortedTowns = Array.from(townStatistic.entries())
        .sort(sortTown);
    for (let [town, statistics] of sortedTowns) {
        console.log(`${town}\nArrivals: ${statistics[0]}\nDepartures: ${statistics[1]}`);
        let sortPlanes = [...townPlanes.get(town).values()]
            .sort((a, b) => a.localeCompare(b));
        console.log("Planes:");
        sortPlanes.forEach(pId => console.log(`-- ${pId}`));
    }

    function sortTown(a, b) {
        let aArrivals = a[1][0];
        let bArrivals = b[1][0];
        let firstCriteria = bArrivals - aArrivals;

        if (firstCriteria !== 0) {
            return firstCriteria;
        }
        return a[0].localeCompare(b[0]);
    }
}

airport([
    "Boeing474 Madrid 300 land",
    "AirForceOne WashingtonDC 178 land",
    "Airbus London 265 depart",
    "ATR72 WashingtonDC 272 land",
    "ATR72 Madrid 135 depart"
]);