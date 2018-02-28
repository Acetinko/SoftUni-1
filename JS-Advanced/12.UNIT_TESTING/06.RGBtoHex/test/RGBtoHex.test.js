let expect = require("chai").expect;
const rgbToHexColor = require("../RGBtoHex").rgbToHexColor;

describe("Test rgbToHexColor", function () {

    it('should return #FF9EAA', function () {
        expect(rgbToHexColor(255, 158, 170)).to.be.equal("#FF9EAA");
    });

    it('should return #0C0D0E', function () {
        expect(rgbToHexColor(12, 13, 14)).to.be.equal("#0C0D0E")
    });

    it('should return #000000', function () {
        expect(rgbToHexColor(0, 0, 0)).to.be.equal("#000000")
    });

    it('should return #FFFFFF', function () {
        expect(rgbToHexColor(255, 255, 255)).to.be.equal("#FFFFFF")
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(-1, 0, 0)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(0, -1, 0)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(0, 0, -1)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(256, 0, 0)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(0, 256, 0)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(0, 0, 256)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(3.12, 0, 0)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(0, 3.12, 0)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor(0, 0, 3.12)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(rgbToHexColor("5", [], {})).to.be.undefined;
    });
});