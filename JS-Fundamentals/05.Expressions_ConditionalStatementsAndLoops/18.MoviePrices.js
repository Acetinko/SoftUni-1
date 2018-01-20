"use strict";

function moviePrices(arrInput) {
    let [movieTitle, dayOfWeek] = arrInput;

    movieTitle = movieTitle.toLowerCase();
    dayOfWeek = dayOfWeek.toLowerCase();
    let message = "";

    if (movieTitle === "The Godfather".toLowerCase()) {
        switch (dayOfWeek) {
            case "monday":
                message = "12";
                break;
            case "tuesday":
                message = "10";
                break;
            case "wednesday":
            case "friday":
                message = "15";
                break;
            case "thursday":
                message = "12.50";
                break;
            case "saturday":
                message = "25";
                break;
            case "sunday":
                message = "30";
                break;
            default:
                message = "error";
                break;
        }

    } else if (movieTitle === "Schindler's List".toLowerCase()) {
        switch (dayOfWeek) {
            case "monday":
            case "tuesday":
            case "wednesday":
            case "thursday":
            case "friday":
                message = "8.50";
                break;
            case "saturday":
            case "sunday":
                message = "15";
                break;
            default:
                message = "error";
                break;
        }

    } else if (movieTitle === "Casablanca".toLowerCase()) {
        switch (dayOfWeek) {
            case "monday":
            case "tuesday":
            case "wednesday":
            case "thursday":
            case "friday":
                message = "8";
                break;
            case "saturday":
            case "sunday":
                message = "10";
                break;
            default:
                message = "error";
                break;
        }
    } else if (movieTitle === "The Wizard of Oz".toLowerCase()) {
        switch (dayOfWeek) {
            case "monday":
            case "tuesday":
            case "wednesday":
            case "thursday":
            case "friday":
                message = "10";
                break;
            case "saturday":
            case "sunday":
                message = "15";
                break;
            default:
                message = "error";
                break;
        }
    } else {
        message = "error";
    }

    console.log(message);
}

moviePrices(["Schindler's LIST", "monday"]);