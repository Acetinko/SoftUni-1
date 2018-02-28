let expect = require("chai").expect;
const createCalculator = require("../AddSubtract").createCalculator;

describe("Test", function () {
    let calc;
    beforeEach(function () {
        calc = createCalculator();
    });

    it('should return Object', function () {
        expect(typeof calc).to.be.equal("object");
    });

    it('should .add', function () {
        calc.add(5);
        calc.add(2);
        expect(calc.get()).to.be.equal(7);
    });

    it('should .subtract', function () {
        calc.subtract(5);
        calc.subtract(5);
        expect(calc.get()).to.be.equal(-10);
    });

    it('should .subtract', function () {
        calc.add(10);
        calc.subtract('7');
        calc.add('-2');
        calc.subtract(-1);
        expect(calc.get()).to.be.equal(2);
    });

    it('should .subtract', function () {
        calc.add(3,14);
        calc.subtract(2.13);
        expect(calc.get()).to.be.closeTo(0.87, 0.001);
    });

    it('should .subtract', function () {
        calc.add(-4);
        calc.subtract(-3);
        expect(calc.get()).to.be.equal(-1);
    });

    it('should not add NaNs', function () {
        calc.add("test");
        expect(calc.get()).to.be.NaN;
    });

    it('should not subtract NaNs', function () {
        calc.subtract("test");
        expect(calc.get()).to.be.NaN;
    });
});