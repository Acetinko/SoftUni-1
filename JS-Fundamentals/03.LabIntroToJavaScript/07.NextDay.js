function nextDay(yyyy, mm, dd) {
    let date = new Date(yyyy, mm-1, dd);
    let oneDay = 24 * 60 * 60 * 1000;
    let nextDate = new Date(date.getTime() + oneDay);

    console.log(nextDate.getFullYear() + '-' +
        (nextDate.getMonth() + 1) + '-' +
        nextDate.getDate()
    );
}

nextDay(2016, 9, 30);