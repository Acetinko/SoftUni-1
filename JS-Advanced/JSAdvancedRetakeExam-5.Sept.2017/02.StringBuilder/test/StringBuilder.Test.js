let expect = require("chai").expect;
let StringBuilder = require("../string-builder").StringBuilder;

describe("Test StringBuilder", function () {
    let strBuilder;
    beforeEach(function () {
        strBuilder = new StringBuilder("test");
    });

    describe("-Test all method - exist", function () {
        it("--it should have initialized all methods", function () {
            expect(StringBuilder.prototype.hasOwnProperty("append")).to.be.true;
            // or
            expect(Object.getPrototypeOf(strBuilder).hasOwnProperty('prepend')).to.be.true;
            expect(StringBuilder.prototype.hasOwnProperty("insertAt")).to.be.true;
            expect(StringBuilder.prototype.hasOwnProperty("remove")).to.be.true;
            expect(StringBuilder.prototype.hasOwnProperty("toString")).to.be.true;
        });
    });

    describe("Test prepend", function () {
        it("append", function () {
            strBuilder.append(' Pesho');
            expect(strBuilder.toString()).to.be.equal('test Pesho')
        });

        it("append", function () {
            strBuilder.append(' Pesho');
            expect(strBuilder._stringArray.length).to.be.equal(10);
        });

        it("append Error", function () {
            let obj = {};
            expect(() => strBuilder.append(obj)).to.throw(TypeError);
        });
    });

    describe("Test prepend", function () {
        it("prepend", function () {
            strBuilder.prepend('Pesho ');
            expect(strBuilder.toString()).to.be.equal('Pesho test')
        });

        it("prepend", function () {
            strBuilder.prepend('Pesho ');
            expect(strBuilder._stringArray.length).to.be.equal(10);
        });

        it("prepend Error", function () {
            let obj = {};
            expect(() => strBuilder.prepend(obj)).to.throw(TypeError);
        });
    });

    describe("Test insertAt", function () {
        it("insertAt", function() {
            strBuilder.insertAt('ss', 2);
            expect(strBuilder._stringArray.length).to.be.equal(6);
        });

        it("insertAt", function() {
            strBuilder.insertAt('ss', 2);
            expect(strBuilder.toString()).to.be.equal('tessst');
        });

        it("insertAt Error", function() {
            expect(() => {strBuilder.insertAt([], 2)}).to.throw(TypeError);
        });
    });

    describe("Test remove", function () {
        it("remove", function() {
            strBuilder.remove(1, 2);
            expect(strBuilder._stringArray.length).to.be.equal(2);
        });
        it("remove", function() {
            strBuilder.remove(1, 2);
            expect(strBuilder.toString()).to.be.equal('tt');
        });
    });

    it("It should return same string", function () {
        expect(strBuilder.toString()).to.be.equal("test");
    });

    it("It should return empty string", function () {
        strBuilder = new StringBuilder();
        expect(strBuilder.toString()).to.be.equal('');
    });

    it("It should throw Error", function () {
        expect(() => new StringBuilder(45)).to.be.throw(TypeError);
    });
});
