let expect = require("chai").expect;
let result = require("../05.ExtensibleClass").Extensible;

describe("Test ExtensibleClass", function () {
    it('Zero test #2', function () {
        let template = {
            extensionData: 5,
            extensionMethod: function (value) {
                return value + 1;
            }
        };

        let testObj = new result();
        expect(testObj.id).to.equal(0, "Instance ID wasn't assigned");

        testObj.extend(template);

        expect(testObj.hasOwnProperty('extensionData')).to.equal(true, "Instance didn't copy the properties correctly.");
        expect(testObj.extensionData).to.equal(5, "Copied property doesn't have correct value.");
        expect(Object.getPrototypeOf(testObj).hasOwnProperty('extensionMethod')).to.equal(true, "Prototype didn't copy the properties correctly.");
        expect(testObj.extensionMethod(1)).to.equal(2, "Copied method doesn't operate correctly.");
    });

    it('Test #2', function () {
        expect(typeof result).to.equal('function', "Couldn't find constructor.");
        expect(result.prototype.hasOwnProperty('extend')).to.equal(true, "Prototype doesn't have an extend() method.");

        let template = {
            em: function () {
                return 5;
            }
        };

        let testObject = new result();
        testObject.extend(template);
        expect(testObject.em()).to.equal(5, "Extension method wasn't cloned correctly.");
    });
});