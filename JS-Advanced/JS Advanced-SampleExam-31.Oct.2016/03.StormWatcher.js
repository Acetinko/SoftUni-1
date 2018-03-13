let Record = (function () {
    let id = 0; // closure
    return class Record {

        constructor(temperature, humidity, pressure, windSpeed) {
            this.id = id++;
            this.temperature = temperature;
            this.humidity = humidity;
            this.pressure = pressure;
            this.windSpeed = windSpeed;
        }

        get weatherStatus() {
            if (this.temperature < 20 &&
                (this.pressure < 700 || this.pressure > 900) &&
                this.windSpeed > 25) {
                return 'Stormy';
            }

            return 'Not stormy';
        }

        toString() {

            return `Reading ID: ${this.id}\n` +
                `Temperature: ${this.temperature}*C\n` +
                `Relative Humidity: ${this.humidity}%\n` +
                `Pressure: ${this.pressure}hpa\n` +
                `Wind Speed: ${this.windSpeed}m/s\n` +
                `Weather: ${this.weatherStatus}`;
        }
    }
})();

let r1 = new Record();
console.log(r1.id); // 0
let r2 = new Record();
console.log(r2.id); // 1
let r3 = new Record();
console.log(r3.id); // 2

let record1 = new Record(32, 66, 760, 12);
console.log(record1.toString());

let record2 = new Record(10, 40, 680, 30);
console.log(record2.toString());

