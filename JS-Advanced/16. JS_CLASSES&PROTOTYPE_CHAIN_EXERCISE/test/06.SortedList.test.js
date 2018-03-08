let expect = require("chai").expect;
let result = require("../06.SortedList").SortedList;

describe("Test SortedList", function () {
    it('Zero test #1', function () {
        expect(result.prototype.hasOwnProperty('add')).to.equal(true, "Function add() was not found");
        expect(result.prototype.hasOwnProperty('remove')).to.equal(true, "Function remove() was not found");
        expect(result.prototype.hasOwnProperty('get')).to.equal(true, "Function get() was not found");

// Instantiate and test functionality
        let myList = new result();
        expect(myList.hasOwnProperty('size')).to.equal(true, "Property size was not found");

        myList.add(5);
        expect(myList.get(0)).to.equal(5, "Element wasn't added");

        myList.add(3);
        expect(myList.get(0)).to.equal(3, "Collection wasn't sorted");

        myList.remove(0);
        expect(myList.get(0)).to.equal(5, "Element wasn't removed");
        expect(myList.size).to.equal(1, "Element wasn't removed");
    });

    it('TEST #2', function () {
        expect(result.prototype.hasOwnProperty('remove')).to.equal(true, "Function remove() was not found");
        expect(result.prototype.hasOwnProperty('get')).to.equal(true, "Function get() was not found");

        let myList = new result();
        expect(myList.hasOwnProperty('size')).to.equal(true, "Property size was not found");

        for (let i = 0; i < 10; i++) {
            myList.add(i);
        }

        myList.remove(9);
        expect(myList.size).to.equal(9, "Element wasn't removed");
        let expectedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// Compare with collection
        for (let i = 0; i < expectedArray.length; i++) {
            expect(myList.get(i)).to.equal(expectedArray[i], "Element wasn't removed");
        }
        myList.remove(5);
        expect(myList.size).to.equal(8, "Element wasn't removed");
        expectedArray = [0, 1, 2, 3, 4, 6, 7, 8];
// Compare with collection
        for (let i = 0; i < expectedArray.length; i++) {
            expect(myList.get(i)).to.equal(expectedArray[i], "Element wasn't removed");
        }
        myList.remove(0);
        expect(myList.size).to.equal(7, "Element wasn't removed");
        expectedArray = [1, 2, 3, 4, 6, 7, 8];
// Compare with collection
        for (let i = 0; i < expectedArray.length; i++) {
            expect(myList.get(i)).to.equal(expectedArray[i], "Element wasn't removed");
        }
    });

    it('TEST #3', function () {

        let myList = new result();
        let failsafe = 'failsafe';

        try {
            failsafe = myList.get(0) ? myList.get(0) : 'failsafe';
        } catch (e) {
        }

        expect(myList.size).to.equal(0, "Unexpected behaviour with empty collection.");
        expect(failsafe).to.equal('failsafe', "Unexpected behaviour with empty collection.");

        try {
            myList.remove(0);
        } catch (e) {
        }

        expect(myList.size).to.equal(0, "Unexpected behaviour with empty collection.");

    });
});