function attachEventsListeners() {
    let convert = document.getElementById("convert");

    convert.addEventListener("click", function (e) {

        let fromDist = Number(document.getElementById("inputDistance").value);
        let fromUnits = document.getElementById("inputUnits").value;

        let toDist = document.getElementById("outputDistance");
        let toUnits = document.getElementById("outputUnits").value;

        if (fromDist <= 0) {
            return;
        }

        switch (fromUnits) {
            case "km":
                toDist.value = convertToDist(fromDist * 1000, toUnits);
                break;
            case "m":
                toDist.value = convertToDist(fromDist, toUnits);
                break;
            case "cm":
                toDist.value = convertToDist(fromDist * 0.01, toUnits);
                break;
            case "mm":
                toDist.value = convertToDist(fromDist * 0.001, toUnits);
                break;
            case "mi":
                toDist.value = convertToDist(fromDist * 1609.34, toUnits);
                break;
            case "yrd":
                toDist.value = convertToDist(fromDist * 0.9144, toUnits);
                break;
            case "ft":
                toDist.value = convertToDist(fromDist * 0.3048, toUnits);
                break;
            case "in":
                toDist.value = convertToDist(fromDist * 0.0254, toUnits);
                break;
            default:
                break;
        }
    });

    function convertToDist(toMeters, toUnits) {
        switch (toUnits) {
            case "km":
                return toMeters / 1000;
            case "m":
                return toMeters / 1;
            case "cm":
                return toMeters / 0.01;
            case "mm":
                return toMeters / 0.001;
            case "mi":
                return toMeters / 1609.34;
            case "yrd":
                return toMeters / 0.9144;
            case "ft":
                return toMeters / 0.3048;
            case "in":
                return toMeters / 0.0254;
            default:
                break;
        }
    }
}