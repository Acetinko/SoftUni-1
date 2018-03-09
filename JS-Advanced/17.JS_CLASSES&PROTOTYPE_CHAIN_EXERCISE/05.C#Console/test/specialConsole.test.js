let expect = require("chai").expect;
let Console = require("../specialConsole").Console;

describe("Test specialConsole", function () {
    it('-writeLine string', function () {
        expect(Console.writeLine("test")).to.be.equal("test");
    });
    it('-writeLine  (object)', function () {
        let obj = {name: "Pesho"};
        expect(Console.writeLine(obj)).to.be.equal(JSON.stringify(obj));
    });

    it('-writeLine  (templateString, parameters)', function () {
        expect(Console.writeLine('{0}, {1}, {2}', 1, 2, 3)).to.be.equal('1, 2, 3');
    });
    it('-writeLine  (templateString, parameters)', function () {
        expect(() => Console.writeLine([], 1, 2)).throw(TypeError);
    });
    it('-writeLine  (templateString, parameters)', function () {
        expect(() => Console.writeLine('{0}', 1, 2)).throw(RangeError);
    });
    it('-writeLine  (templateString, parameters)', function () {
        expect(() => Console.writeLine('{13}', 7, 2, 3)).throw(RangeError);
    });
    it('-writeLine  (templateString, parameters)', function () {
        expect(() => Console.writeLine('{13}', 7)).throw(RangeError);
    });
});