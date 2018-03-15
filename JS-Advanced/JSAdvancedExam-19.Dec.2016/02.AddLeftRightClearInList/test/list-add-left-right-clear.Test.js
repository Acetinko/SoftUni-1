let expect = require("chai").expect;
let makeList = require("../list-add-left-right-clear");

describe("TODO …", function () {
    let myList = {};
    beforeEach(function () {
        myList = makeList();
    });

    it("-addLeft string", function () {
        myList.addLeft("Pesho");
        myList.addLeft("Gosho");
        myList.addLeft("Miro");
        expect(myList.toString()).to.be.equal("Miro, Gosho, Pesho");
    });
    it("-addLeft type", function () {
        myList.addLeft({name: "Pesho"});
        myList.addLeft([1, 2]);
        myList.addLeft(2);
        expect(myList.toString()).to.be.equal("2, 1,2, [object Object]");
    });

    it("-addRight string", function () {
        myList.addRight("Pesho");
        myList.addRight("Gosho");
        myList.addRight("Miro");
        expect(myList.toString()).to.be.equal("Pesho, Gosho, Miro");
    });
    it("-addRight type", function () {
        myList.addRight({name: "Pesho"});
        myList.addRight([1, 2]);
        myList.addRight(2);
        expect(myList.toString()).to.be.equal("[object Object], 1,2, 2");
    });

    it('--clear empty', function () {
        myList.clear();
        expect(myList.toString()).to.be.equal('');
    });
    it('--clear non-empty', function () {
        myList.addLeft(78);
        myList.addRight(5);
        myList.clear();
        expect(myList.toString()).to.be.equal('');
    });

    it('--toString empty', function () {
        expect(myList.toString()).to.be.equal('');
    });
});