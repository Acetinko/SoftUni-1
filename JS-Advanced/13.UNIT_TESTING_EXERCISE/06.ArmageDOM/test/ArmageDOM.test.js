const expect = require("chai").expect;
const jsdom = require("jsdom-global")();
const $ = require("jquery");
const nuke = require("../ArmageDOM").nuke;

describe("Test ArmageDOM", function () {
    let oldHtml, htmlSelector;
    beforeEach("HTML", function () {
        document.body.innerHTML = `<div id="target">
            <div class="nested target">
                <p>This is some text</p>
            </div>
            <div class="target">
                <p>Empty div</p>
            </div>
            <div class="inside">
                <span class="nested">Some more text</span>
                <span class="target">Some more text</span>
            </div>
        </div>`;

        htmlSelector = $("#target");
        oldHtml = htmlSelector.html();
    });

    it('should not remove with an invalid selector', function () {
        let oldHtml = $(htmlSelector).html();
        nuke(htmlSelector, 2);
        expect(htmlSelector.html()).to.be.equal(oldHtml);
    });

    it('should not remove with duplicate selector', function () {
        let selectorOne = $(".nested");
        nuke(selectorOne, selectorOne);
        expect(htmlSelector.html()).to.be.equal(oldHtml);
    });

    it('should not remove with two valid selectors', function () {
        let selectorOne = $(".nested");
        let selectorTwo = $(".inside");
        nuke(selectorOne, selectorTwo);
        expect(htmlSelector.html()).to.be.equal(oldHtml);
    });

    it('should remove with valid and different selectors', function () {
        let selectorOne = $(".nested");
        let selectorTwo = $(".target");
        nuke(selectorOne, selectorTwo);
        expect(htmlSelector.html()).to.not.be.equal(oldHtml);
    });
});