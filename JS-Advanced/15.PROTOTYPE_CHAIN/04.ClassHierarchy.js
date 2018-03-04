function result() {

// Abstract class
    class Figure {
        constructor() {
            if (new.target === Figure) {
                throw new TypeError("Can't do this");
            }
        }

        get area() {
            return undefined;
        }

        toString() {
            return this.constructor.name;
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this._radius = radius;
        }

        set radius(radius) {
            this._radius = radius
        }

        get radius() {
            return this._radius;
        }

        get area() {
            return Math.PI * this._radius * this._radius;
        }

        toString() {
            return `${super.toString()} - radius: ${this._radius}`;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height) {
            super();
            this._width = width;
            this._height = height;
        }

        set width(width) {
            this._width = width;
        }

        get width() {
            return this._width;
        }

        set height(height) {
            this._height = height;
        }

        get height() {
            return this._height;
        }

        get area() {
            return this._width * this._height;
        }

        toString() {
            return `${super.toString()} - width: ${this._width}, height: ${this._height}`;
        }
    }

    return {Figure, Circle, Rectangle}
}


module.exports = {result};

////let f = new Figure();       //Error
//let c1 = new Circle(5);
//console.log(c1.area);        //78.53981633974483
//console.log(c1.toString());  //Circle - radius: 5
//let r1 = new Rectangle(3, 4);
//console.log(r1.area);        //12
//console.log(r1.toString());  //Rectangle - width: 3, height: 4
//
//
////new Figure(); //(Error);
//let r = new Rectangle(3, 4);
//console.log(r.width); // 3,"Width did not match."
//console.log(r.height); // 4, "Height did not match."
//let c = new Circle(5);
//console.log(c.radius); // 5