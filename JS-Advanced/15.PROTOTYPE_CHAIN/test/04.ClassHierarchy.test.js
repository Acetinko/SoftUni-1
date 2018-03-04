let expect = require("chai").expect;
let result = require("../04.ClassHierarchy").result;

describe("Test ClassHierarchy", function () {
    it('should "Green TEST"', function () {
        let classes = result();
        let Figure = classes.Figure;
        let Rectangle = classes.Rectangle;
        let Circle = classes.Circle;

        let r = new Rectangle(3,4);
        expect(r.area).to.equal(12,"Rectangle area did not match.");
        let c = new Circle(5);
        expect(c.area).to.be.closeTo(78.53981633974483,0.1,"Circle area was not close to expected value.");
    });

    it('should "Green TEST"', function () {
        let classes = result();
        let Figure = classes.Figure;
        let Rectangle = classes.Rectangle;
        let Circle = classes.Circle;

        expect(()=>new Figure()).to.throw(Error);
        let r = new Rectangle(3,4);
        expect(r.toString()).to.equal("Rectangle - width: 3, height: 4");
        let c = new Circle(5);
        expect(c.toString()).to.equal("Circle - radius: 5");
    });

    it('should "Green TEST"', function () {
        let classes = result();
        let Figure = classes.Figure;
        let Rectangle = classes.Rectangle;
        let Circle = classes.Circle;

        expect(()=>new Figure()).to.throw(Error);
        let r = new Rectangle(2,85);
        expect(r.area).to.equal(170,"Rectangle area did not match.");
        expect(r.toString()).to.equal("Rectangle - width: 2, height: 85");
        let c = new Circle(13);
        expect(c.area).to.be.closeTo(530.929158456675,0.1,"Circle area was not close to expected value.");
        expect(c.toString()).to.equal("Circle - radius: 13");
    });
});