function createComputerHierarchy() {
    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            // abstract class
            if (new.target === Computer) {
                throw new Error("Cannot instantiate directly.");
            }

            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Keyboard {
        constructor(manufacturer, responseTime) {
            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {
            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery {
        constructor(manufacturer, expectedLife) {
            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        set battery(value) {
            if (!(value instanceof Battery)) {
                throw new TypeError("Battery is not Battery");
            }
            this._battery = value;
        }

        get battery() {
            return this._battery;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.monitor = monitor;
            this.keyboard = keyboard;
        }

        set keyboard(value) {
            if (!(value instanceof Keyboard)) {
                throw new TypeError("Keyboard is not Keyboard");
            }
            this._keyboard = value;
        }

        get keyboard() {
            return this._keyboard;
        }

        set monitor(value) {
            if (!(value instanceof Monitor)) {
                throw new TypeError("Monitor is not Monitor");
            }
            this._monitor = value;
        }

        get monitor() {
            return this._monitor;
        }
    }

    return {
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop
    }
}