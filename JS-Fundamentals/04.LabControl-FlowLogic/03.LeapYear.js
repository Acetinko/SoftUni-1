"use strict";

function isLeapYear(year) {
    let isLeap = (year % 4 === 0 && year % 100 !== 0) ||  (year % 400 === 0 );

    console.log(isLeap ? "yes" : "no");

}

isLeapYear(2000);