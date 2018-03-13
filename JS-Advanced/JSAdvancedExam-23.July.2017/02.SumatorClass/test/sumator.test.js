let expect = require("chai").expect;
let Sumator = require("../sumator").Sumator;

describe("TODO …", function() {
    let sumator;
    beforeEach(function () {
        sumator = new Sumator();
    });

    describe("Test function exist", function () {
        it("data", function () {
            expect(sumator.data !== undefined).to.be.true;
        });
        it("add exist", function () {
            expect(Sumator.prototype.hasOwnProperty("add")).to.be.true;
        });
        it("sumNums exist", function () {
            expect(Sumator.prototype.hasOwnProperty("sumNums")).to.be.true;
        });
        it("removeByFilter exist", function () {
            expect(Sumator.prototype.hasOwnProperty("removeByFilter")).to.be.true;
        });
        it("toString exist", function () {
            expect(Sumator.prototype.hasOwnProperty("toString")).to.be.true;
        });
    });

    describe("Test if data arr is empty", function () {

        it("Test if data arr is empty", function () {
            expect(sumator.data.length).to.be.equal(0);
        });
    });
    
    describe("Test add fuction", function () {
        it('--add only number', function () {
            sumator.add(2);
            sumator.add(8);
            sumator.add(3);
            expect(sumator.data.join(', ')).to.be.equal("2, 8, 3");
        });
        it('--add only string', function () {
            sumator.add("pesho");
            sumator.add("gosho");
            sumator.add("kiro");
            expect(sumator.data.join(', ')).to.be.equal("pesho, gosho, kiro");
        });
        it('--add only object', function () {
            sumator.add({name: "pesho"});
            sumator.add({});
            expect(sumator.data.join(', ')).to.be.equal("[object Object], [object Object]");
        });
        it('--add only types', function () {
            sumator.add({types: "pesho"});
            sumator.add(4);
            expect(sumator.data.join(', ')).to.be.equal("[object Object], 4");
        });
    });

    describe("Test sum nums func", function () {
        it('--add only number', function () {
            sumator.add(5);
            sumator.add(10);
            sumator.add(20);
            expect(sumator.sumNums()).to.be.equal(35);
        });
        it('--add only types', function () {
            sumator.add({});
            sumator.add("pesho");
            sumator.add({name: "minko"});
            expect(sumator.sumNums()).to.be.equal(0);
        });
        it('--add only types', function () {
            sumator.add({});
            sumator.add(3);
            sumator.add("pesho");
            sumator.add(3);
            expect(sumator.sumNums()).to.be.equal(6);
        });
    });

    describe("Test remove by filter", function () {
        it('--remove all odd numbers', function () {
            for (let i = 0; i <=10; i++) {
                sumator.add(i);
            }
            sumator.removeByFilter(x => x % 2 !== 0);
            expect(sumator.data.join(', ')).to.be.equal("0, 2, 4, 6, 8, 10");
        });
        it('--remove all numbers > 5', function () {
            for (let i = 0; i <=10; i++) {
                sumator.add(i);
            }
            sumator.removeByFilter(x => x > 5);
            expect(sumator.data.join(', ')).to.be.equal("0, 1, 2, 3, 4, 5");
        });
        it('throws exception', function () {
            for (let i = 0; i <=10; i++) {
                sumator.add(i);
            }
            expect(() => sumator.removeByFilter(undefined)).to.be.throw;
        });
    });

    describe("Test toString()", function () {
        it('with items in array', function () {
            sumator.add(5);
            sumator.add("pesho");
            expect(sumator.toString()).to.be.equal("5, pesho");
        });
        it('array is empty', function () {
            expect(sumator.toString()).to.be.equal("(empty)");
        });
    });
});
