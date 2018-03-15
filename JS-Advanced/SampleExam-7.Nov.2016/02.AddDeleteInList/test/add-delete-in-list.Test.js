let expect = require("chai").expect;
let list = require("../add-delete-in-list");

//console.log(`list = [${list}]`);
//list.add(1);
//console.log(`list = [${list}]`);
//list.add("two");
//list.add(3);
//console.log(`list = [${list}]`);
//console.log("deleted: " + list.delete(1));
//console.log(`list = [${list}]`);
//console.log("cannot delete: " + list.delete(-1));
//console.log(`list = [${list}]`);



describe("Test list", function () {

    it('-toString empty', function () {
        expect(list.toString()).to.be.equal('');
    });

    it('-add non-empty', function () {
        list.add(1);
        list.add('Pesho');
        list.add({name: 'Mesho'});
        expect(list.toString()).to.be.equal("1, Pesho, [object Object]");
        list.add();
        expect(list.toString()).to.be.equal("1, Pesho, [object Object], ");
    });

    it('-delete', function () {
        list.delete(0);
        expect(list.toString()).to.be.equal('1, Pesho, [object Object]');
    });

    it('-delete string', function () {
        expect(list.delete('Pesho')).to.be.undefined;
    });

    it('-delete -1', function () {
        expect(list.delete(0.12)).to.be.undefined;
    });

    it('-delete -1', function () {
        expect(list.delete(-1)).to.be.undefined;
    });

    it('-delete data.length', function () {
        expect(list.delete(3)).to.be.undefined;
    });

    it('toString', function () {
        expect(list.toString()).to.be.equal('Pesho, 2, [object Object]');
    });
});