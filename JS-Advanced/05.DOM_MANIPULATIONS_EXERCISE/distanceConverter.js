function attachEventsListeners() {
    let convertValue = {
        "km": 1000,
        "m": 1,
        "cm": 0.01,
        "mm": 0.001,
        "mi": 1609.34,
        "yrd": 0.9144,
        "ft": 0.3048,
        "in": 0.0254
    };

    let convertBtn = document.getElementById("convert");
    let inputUnits = document.getElementById("inputUnits");
    let outputUnits = document.getElementById("outputUnits");
    let inputDistance = (document.getElementById("inputDistance"));
    let outputDistance = document.getElementById("outputDistance");

    convertBtn.addEventListener("click", function () {
        outputDistance.value = Number(inputDistance.value) *
            (convertValue[inputUnits.value] / convertValue[outputUnits.value]);
    });
}