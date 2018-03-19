let expect = require("chai").expect;
let PaymentPackage = require("../PaymentPackage").PaymentPackage;

describe("Test PaymentPackage", function () {
    let pPack;
    beforeEach(function () {
        pPack = new PaymentPackage("Test", 4);
    });

    it('--name throw Error', function () {
        expect(() => new PaymentPackage('HR Services')).to.be.throw(Error, "Value must be a non-negative number");
    });

    describe("Test function exist", function () {
        it('function exist', function () {
            expect(PaymentPackage.prototype.hasOwnProperty("name")).to.be.true;
            expect(PaymentPackage.prototype.hasOwnProperty("value")).to.be.true;
            expect(PaymentPackage.prototype.hasOwnProperty("VAT")).to.be.true;
            expect(PaymentPackage.prototype.hasOwnProperty("active")).to.be.true;
            expect(PaymentPackage.prototype.hasOwnProperty("toString")).to.be.true;
        });
    });

    describe("Test --name", function () {
        it('--name throw Name must be a non-empty string', function () {
            expect(() => pPack.name = ('')).to.be.throw(Error, "Name must be a non-empty string")
        });
        it('--name throw Name must be a non-empty string', function () {
            expect(() => pPack.name = ({})).to.be.throw(Error, "Name must be a non-empty string")
        });
        it('--name return Pesho', function () {
            pPack.name = "Pesho";
            expect(pPack.name).to.be.equal("Pesho");
        });
        it('--name return 5', function () {
            pPack.name = "Pesho";
            expect(pPack.name.length).to.be.equal(5);
        });
    });

    describe("Test --value", function () {
        it('--value negative number', function () {
            expect(() => pPack.value = -1).to.be.throw(Error, "Value must be a non-negative number")
        });
        it('--value string ', function () {
            expect(() => pPack.value = 'iuoy').to.be.throw(Error, "Value must be a non-negative number")
        });
        it('--value zero', function () {
            pPack.value = 0;
            expect(pPack.value).to.be.equal(0);
        });
        it('--value five', function () {
            pPack.value = 5567;
            expect(pPack.value).to.be.equal(5567);
        });
    });

    describe("Test --VAT", function () {
        it('--VAT negative number', function () {
            expect(() => pPack.VAT = -1).to.be.throw(Error, "VAT must be a non-negative number")
        });
        it('--VAT string ', function () {
            expect(() => pPack.VAT = '').to.be.throw(Error, "VAT must be a non-negative number")
        });
        it('--VAT zero', function () {
            pPack.VAT = 0;
            expect(pPack.VAT).to.be.equal(0);
        });
        it('--VAT five', function () {
            pPack.VAT = 5567;
            expect(pPack.VAT).to.be.equal(5567);
        });
    });

    describe("Test --active", function () {
        it('--active default', function () {
            expect(pPack.active).to.be.true;
        });
        it('--active string ', function () {
            expect(() => pPack.active = '').to.be.throw(Error, "Active status must be a boolean");
        });
        it('--active true', function () {
            pPack.active = true;
            expect(pPack.active).to.be.true;
        });
        it('--active false', function () {
            pPack.active = false;
            expect(pPack.active).to.be.false;
        });
    });

    it('--toString', function () {
        expect(pPack.toString()).to.be.equal('Package: Test\n- Value (excl. VAT): 4\n- Value (VAT 20%): 4.8');
    });

});
