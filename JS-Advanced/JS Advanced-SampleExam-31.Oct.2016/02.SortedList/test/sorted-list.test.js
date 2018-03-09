let expect = require("chai").expect;
let SortedList = require("../sorted-list").SortedList;

describe("Test sorted-listr", function () {
    let myList;
    beforeEach(function () {
        myList = new SortedList();
    });

    describe("-Test initial state", function () {
        it('--add exists', function () {
            expect(SortedList.prototype.hasOwnProperty("add")).to.be.equal(true);
        });
        it('--remove exists', function () {
            expect(SortedList.prototype.hasOwnProperty("remove")).to.be.equal(true);
        });
        it('--get exists', function () {
            expect(SortedList.prototype.hasOwnProperty("get")).to.be.equal(true);
        });
        it('--size exists', function () {
            expect(SortedList.prototype.hasOwnProperty("size")).to.be.equal(true);
        });
    });
    
    describe("-Add element", function () {
        it('--add one element', function () {
            myList.add(2);
            expect(myList.list.join(', ')).to.be.equal('2');
        });
        it('--add many element', function () {
            myList.add(5);
            myList.add(3);
            myList.add(8);
            expect(myList.list.join(', ')).to.be.equal('3, 5, 8');
        });
    });

    describe("-Test remove", function () {
        it('--test if list is empty (should throw)', function () {
            expect(() => myList.remove()).throw(Error, "Collection is empty.");
        });
        it('--test if index negative (should throw)', function () {
            myList.add(9);
            expect(() => myList.remove(-1)).throw(Error, "Index was outside the bounds of the collection.");
        });
        it('--test if index is equal to list length (should throw)', function () {
            myList.add(3);
            expect(() => myList.remove(1)).throw(Error, "Index was outside the bounds of the collection.");
        });
        it('--test if index is bigger than list length (should throw)', function () {
            myList.add(0);
            myList.add(1);
            myList.add(2);
            expect(() => myList.remove(5)).throw(Error, "Index was outside the bounds of the collection.");
        });
        it('--test with correct index (element should be remove)', function () {
            myList.add(2);
            myList.add(1);
            myList.add(0);
            myList.remove(1);
            expect(myList.list.join(', ')).to.be.equal('0, 2');
        });
    });
    
    describe("-Test get", function () {
        it('--test if list is empty (should throw)', function () {
            expect(() => myList.get()).throw(Error, "Collection is empty.");
        });
        it('--test if index is equal to list length (should throw)', function () {
            myList.add(5);
            myList.add(2);
            expect(() => myList.get(2)).throw(Error, "Index was outside the bounds of the collection.");
        });
        it('--test if index is bigger than list length (should throw)', function () {
            myList.add(5);
            myList.add(2);
            myList.add(0);
            expect(() => myList.get(4)).throw(Error, "Index was outside the bounds of the collection.");
        });
        it('--test with correct index (should remove correct element)', function () {
            myList.add(5);
            myList.add(2);
            myList.add(0);
            expect(myList.get(1)).to.be.equal(2);
        });
        
        describe("-Test size", function () {
            it('--test with empty list', function () {
                expect(myList.size).to.be.equal(0);
            });
            it('--test with non-empty list', function () {
                myList.add(9);
                myList.add(4);
                myList.add(6);
                myList.add(2);
                expect(myList.size).to.be.equal(4);
            });
        });
    });
});