let expect = require("chai").expect;
let jsdom = require("jsdom-global")();
let $ = require("jquery");

document.body.innerHTML = '<body>\n' +
'    <div id="wrapper">\n' +
'        <input type="text" id="name">\n' +
'        <input type="text" id="income">\n' +
'    </div>\n' +
'</body>\n' +
'</html>\n';

const sharedObject = require("../SharedObject").sharedObject;


describe("Test sharedObject", function () {

    describe("Initial value test", function () {
        it('should name null', function () {
            expect(sharedObject.name).to.be.null;
        });

        it('should income null', function () {
            expect(sharedObject.income).to.be.null;
        });
    });

    describe("changeName", function () {
        it('should return null', function () {
            sharedObject.changeName('');
            expect(sharedObject.name).to.be.null;
        });

        it('should return тест', function () {
            sharedObject.changeName('Test');
            expect(sharedObject.name).to.be.equal('Test');
        });

        describe("changeName HTML", function () {
            it('should return null', function () {
                sharedObject.changeName("TestEmpty");
                sharedObject.changeName('');
                let nameHTML = $("#name");
                expect(nameHTML.val()).to.be.equal("TestEmpty");
            });

            it('should return тест', function () {
                sharedObject.changeName("Georgiev");
                let nameHTML = $("#name");
                expect(nameHTML.val()).to.be.equal("Georgiev");
            });
        });
    });

    describe("changeIncome", function () {
        it('should return null', function () {
            sharedObject.changeIncome('f');
            expect(sharedObject.income).to.be.null;
        });

        it('should return 25', function () {
            sharedObject.changeIncome(25);
            expect(sharedObject.income).to.be.equal(25);
        });

        it('should return 5', function () {
            sharedObject.changeIncome(5);
            sharedObject.changeIncome(5.23);
            expect(sharedObject.income).to.be.equal(5);
        });

        it('should return 5', function () {
            sharedObject.changeIncome(5);
            sharedObject.changeIncome(-4);
            expect(sharedObject.income).to.be.equal(5);
        });

        it('should return 5', function () {
            sharedObject.changeIncome(5);
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.be.equal(5);
        });

        describe("changeIncome HTML", function () {
            it('should not change correctly', function () {
                sharedObject.changeIncome(9);
                sharedObject.changeIncome('g');
                let incomeHTML = $("#income");
                expect(incomeHTML.val()).to.be.equal('9');
            });

            it('should with a positive number', function () {
                sharedObject.changeIncome(19);
                let incomeHTML = $("#income");
                expect(incomeHTML.val()).to.be.equal('19');
            });

            it('should with a floating-point number', function () {
                sharedObject.changeIncome(19);
                sharedObject.changeIncome(2.19);
                let incomeHTML = $("#income");
                expect(incomeHTML.val()).to.be.equal('19');
            });

            it('should with a negative number', function () {
                sharedObject.changeIncome(19);
                sharedObject.changeIncome(-2);
                let incomeHTML = $("#income");
                expect(incomeHTML.val()).to.be.equal('19');
            });

            it('should with a zero number', function () {
                sharedObject.changeIncome(19);
                sharedObject.changeIncome(0);
                let incomeHTML = $("#income");
                expect(incomeHTML.val()).to.be.equal('19');
            });
        })
    });

    describe("updateName", function () {
        it('should with an empty string (should not change property)', function () {
            sharedObject.changeName("Vasil");
            let nameEl = $("#name");
            nameEl.val('');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal("Vasil");
        });

        it('should with an non-empty string (should not change property)', function () {
            sharedObject.changeName("Vasil");
            let nameEl = $("#name");
            nameEl.val('Minko');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal("Minko");
        });
    });

    describe("updateIncome", function () {
        it('should with a string (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $("#income");
            incomeEl.val('incomeEl');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3);
        });

        it('should with a floating-point (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $("#income");
            incomeEl.val('3.11');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3);
        });

        it('should with a negative number (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $("#income");
            incomeEl.val('-53');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3);
        });

        it('should with zero (should not change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $("#income");
            incomeEl.val('0');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3);
        });

        it('should with a positive integer (should change income property)', function () {
            sharedObject.changeIncome(3);
            let incomeEl = $("#income");
            incomeEl.val('35');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(35);
        });
    });
});