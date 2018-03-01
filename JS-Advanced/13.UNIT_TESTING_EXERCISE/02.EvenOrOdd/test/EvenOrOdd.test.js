let expect = require("chai").expect;
const isOddOrEven = require("../EvenOrOdd").isOddOrEven;

describe("Test isOddOrEven", function () {
    it('should undefined', function () {
        expect(isOddOrEven(22)).to.be.undefined;
    });

    it('should undefined', function () {
        expect(isOddOrEven({name: "Pesho"})).to.be.undefined;
    });

    it('should even', function () {
        expect(isOddOrEven("test")).to.be.equal("even");
    });

    it('should odd', function () {
        expect(isOddOrEven("Peter")).to.be.equal("odd");
    });
});