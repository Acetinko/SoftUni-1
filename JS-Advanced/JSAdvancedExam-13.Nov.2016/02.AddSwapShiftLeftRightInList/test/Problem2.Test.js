let expect = require("chai").expect;
let createList = require("../list-add-swap-shift-left-right").createList;

describe("Test  createList", function () {
    let list;
    beforeEach(function () {
        list = createList();
    });

    //describe("-Test initial state", function () {
    //    it('--add exist', function () {
    //        expect(list.hasOwnProperty("add")).to.be.true;
    //    });
    //    it('--shiftLeft exist', function () {
    //        expect(list.hasOwnProperty("shiftLeft")).to.be.true;
    //    });
    //    it('--shiftRight exist', function () {
    //        expect(list.hasOwnProperty("shiftRight")).to.be.true;
    //    });
    //    it('--swap exist', function () {
    //        expect(list.hasOwnProperty("swap")).to.be.true;
    //    });
    //    it('--toString exist', function () {
    //        expect(list.hasOwnProperty("toString")).to.be.true;
    //    });
    //});

    describe("-Test add function", function () {
        it('--add many type', function () {
            list.add({name: "Pesho"});
            list.add("Ipo");
            list.add(8);
            expect(list.toString()).to.be.equal("[object Object], Ipo, 8");
        });
    });

    describe("-Test shiftLeft function", function () {
        it('--shiftLeft (with non-empty data)', function () {
            list.add(1);
            list.add("Pesho");
            list.add([2, 3]);
            list.shiftLeft();
            expect(list.toString()).to.be.equal("Pesho, 2,3, 1");
        });
    });

    describe("-Test shiftRight function", function () {
        it('--shiftRight (with non-empty data)', function () {
            list.add(1);
            list.add("Pesho");
            list.add([2, 3]);
            list.shiftRight();
            expect(list.toString()).to.be.equal("2,3, 1, Pesho");
        });
    });

    describe("swap", function () {
        it('with a negative first index, should return false', function () {
            list.add('one');
            list.add(2);
            expect(list.swap(-5, 1)).to.equal(false);
        });

        it('with a negative first index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(-5, 1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with a non integer first index, should return false', function () {
            list.add('one');
            list.add('two');
            expect(list.swap('stamat', 1)).to.equal(false);
        });

        it('with a non integer first index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap([4, 13], 1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with first index equal to number of elements, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(3, 1)).to.equal(false);
        });

        it('with first index equal to number of elements, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(3, 1);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with a negative second index, should return false', function () {
            list.add('one');
            list.add(2);
            expect(list.swap(0, -1)).to.equal(false);
        });

        it('with a negative second index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(0, -1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with a non integer second index, should return false', function () {
            list.add('one');
            list.add('two');
            expect(list.swap(0, 'stamat')).to.equal(false);
        });

        it('with a non integer second index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(0, [4, 13]);
            expect(list.toString()).to.equal("one, two");
        });

        it('with second index equal to number of elements, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(0, 3)).to.equal(false);
        });

        it('with second index equal to number of elements, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(0, 3);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with equal indexes, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(1, 1)).to.equal(false);
        });

        it('with equal indexes, collection should stay the same', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(1, 1);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with zero first index, should return true', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(0, 1)).to.equal(true)
        });

        it('with zero second indexes, should return true', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(2, 0)).to.equal(true);
        });

        it('with zero first index, should swap the values', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(0, 2);
            expect(list.toString()).to.equal("three, two, one");
        });

        it('with zero second index, should swap the values', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(1, 0);
            expect(list.toString()).to.equal("three, two, one");
        });
    });
});


//let list = createList();
//list.add(1);
//list.add("two");
//list.add(3);
//console.log(`list = [${list}]`);
//list.shiftLeft();
//console.log("shifted left <--");
//console.log(`list = [${list}]`);
//list.add(["four"]);
//console.log(`list = [${list}]`);
//list.shiftRight();
//console.log("shifted right -->");
//console.log(`list = [${list}]`);
//console.log(`Swaping [0] and [3]: ${list.swap(0,3)}`);
//console.log(`list = [${list}]`);
//console.log(`Swaping [1] and [1]: ${list.swap(1,1)}`);
//console.log(`list = [${list}]`);
