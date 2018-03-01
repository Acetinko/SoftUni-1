let expect = require("chai").expect;
const lookupChar = require("../CharLookup").lookupChar;

describe("Test lookupChar", function () {
    it('should return undefined', function () {
        expect(lookupChar(13, 0)).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(lookupChar("pesho", "gosho")).to.be.undefined;
    });

    it('should return undefined', function () {
        expect(lookupChar("pesho", 3.12)).to.be.undefined;
    });

    it('should return Incorrect index', function () {
        expect(lookupChar("gosho", 13)).to.be.equal("Incorrect index");
    });

    it('should return Incorrect index', function () {
        expect(lookupChar("stamat", -1)).to.be.equal("Incorrect index");
    });

    it('should return Incorrect index', function () {
        expect(lookupChar("pesho", 5)).to.be.equal("Incorrect index");
    });

    it('should return p', function () {
        expect(lookupChar("pesho", 0)).to.be.equal('p');
    });

    it('should return m', function () {
        expect(lookupChar("stamat", 3)).to.be.equal('m');
    });
});