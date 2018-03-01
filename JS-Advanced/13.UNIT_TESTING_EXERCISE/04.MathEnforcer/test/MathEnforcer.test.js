let expect = require("chai").expect;
const mathEnforcer = require("../MathEnforcer").mathEnforcer;

describe("Test mathEnforcer", function () {
    describe("addFive", function () {
        it('should undefined', function () {
            expect(mathEnforcer.addFive("test")).to.be.undefined;
        });

        it('should return 5', function () {
            expect(mathEnforcer.addFive(0)).to.be.equal(5);
        });

        it('should return 25', function () {
            expect(mathEnforcer.addFive(20)).to.be.equal(25);
        });

        it('should return -8', function () {
            expect(mathEnforcer.addFive(-8)).to.be.equal(-3);
        });

        it('should return 7.12', function () {
            expect(mathEnforcer.addFive(3.12)).to.be.closeTo(8.12, 0.001);
        });

        it('should return -3.12', function () {
            expect(mathEnforcer.addFive(-8.12)).to.be.closeTo(-3.12, 0.001);
        });
    });

    describe("subtractTen", function () {
        it('should undefined', function () {
            expect(mathEnforcer.subtractTen("test")).to.be.undefined;
        });

        it('should return -10', function () {
            expect(mathEnforcer.subtractTen(0)).to.be.equal(-10);
        });

        it('should return 10', function () {
            expect(mathEnforcer.subtractTen(20)).to.be.equal(10);
        });

        it('should return -18', function () {
            expect(mathEnforcer.subtractTen(-8)).to.be.equal(-18);
        });

        it('should return 7.12', function () {
            expect(mathEnforcer.subtractTen(3.12)).to.be.closeTo(-6.88, 0.001);
        });

        it('should return -18.12', function () {
            expect(mathEnforcer.subtractTen(-8.12)).to.be.closeTo(-18.12, 0.001);
        });
    });

    describe("sum", function () {
        it('should undefined', function () {
            expect(mathEnforcer.sum("test", 2)).to.be.undefined;
        });

        it('should undefined', function () {
            expect(mathEnforcer.sum(3, "test")).to.be.undefined;
        });

        it('should return 7', function () {
            expect(mathEnforcer.sum(2, 5)).to.be.equal(7);
        });

        it('should return 0', function () {
            expect(mathEnforcer.sum(0, 0)).to.be.equal(0);
        });

        it('should return -16', function () {
            expect(mathEnforcer.sum(-8, -8)).to.be.equal(-16);
        });

        it('should return -1.01', function () {
            expect(mathEnforcer.sum(-3.12, 2.11)).to.be.closeTo(-1.01, 0.001);
        });

        it('should return -5.98', function () {
            expect(mathEnforcer.sum(2.14, -8.12)).to.be.closeTo(-5.98, 0.001);
        });
    });
});
