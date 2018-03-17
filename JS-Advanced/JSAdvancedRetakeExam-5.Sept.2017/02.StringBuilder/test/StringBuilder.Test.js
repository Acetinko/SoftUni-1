let expect = require("chai").expect;
let StringBuilder = require("../string-builder").StringBuilder;

describe("Test StringBuilder", function () {
    let stringBuilder;
    beforeEach(function () {
        stringBuilder = new StringBuilder('pesho');
    });

    describe("-function exist", function () {
        it('--exist', function () {
            expect(StringBuilder.prototype.hasOwnProperty("append")).to.be.true;
            expect(StringBuilder.prototype.hasOwnProperty("prepend")).to.be.true;
            expect(StringBuilder.prototype.hasOwnProperty("insertAt")).to.be.true;
            expect(StringBuilder.prototype.hasOwnProperty("remove")).to.be.true;
            expect(StringBuilder.prototype.hasOwnProperty("toString")).to.be.true;
        });
    });

    describe("-append", function () {
        it('--append(non-string)', function () {
            expect(() => stringBuilder.append(9)).to.be.throw(TypeError, 'Argument must be string');
        });
        it('--append(string)', function () {
            stringBuilder.append(", tests");
            expect(stringBuilder._stringArray.join('')).to.be.equal("pesho, tests");
        });
        it('--append(string)', function () {
            stringBuilder.append(", tests");
            expect(stringBuilder._stringArray.length).to.be.equal(12);
        });
    });

    describe("-prepend", function () {
        it('--prepend(non-string)', function () {
            expect(() => stringBuilder.prepend(8)).to.be.throw(TypeError, 'Argument must be string');
        });
        it('--prepend(string)', function () {
            stringBuilder.prepend("tests, ");
            expect(stringBuilder._stringArray.join('')).to.be.equal("tests, pesho");
        });
        it('--prepend(string)', function () {
            stringBuilder.prepend("tests, ");
            expect(stringBuilder._stringArray.length).to.be.equal(12);
        });
    });

    describe("-insertAt", function () {
        it('--insertAt(non-string)', function () {
            expect(() => stringBuilder.insertAt(23, 2)).to.be.throw(TypeError, 'Argument must be string');
        });
        it('--insertAt(string)', function () {
            stringBuilder.insertAt("tests", 1);
            expect(stringBuilder._stringArray.join('')).to.be.equal("ptestsesho");
        });
        it('--insertAt(string)', function () {
            stringBuilder.insertAt("tests", 5);
            expect(stringBuilder._stringArray.length).to.be.equal(10);
        });
    });

    describe("-remove", function () {
        it('--remove(0, length+1)', function () {
            stringBuilder.remove(0, "pesho".length);
            expect(stringBuilder._stringArray.join('')).to.be.equal('');
        });
    });

    describe("-toString", function () {
        it('--toString empty', function () {
            let str = new StringBuilder('');
            expect(str.toString()).to.be.equal('');
        });
        it('--toString non-empty', function () {
            expect(stringBuilder.toString()).to.be.equal("pesho");
        });
    });
});