class PaymentManager {
    constructor(title) {
        this.title = title;
        this.data = {};
        this.element = this.createElement();
    }

    render(id) {
        $(`#${id}`).append(this.element);
    }

    createElement() {
        this.table = $("<table>");
        let caption = $("<caption>").text(`${this.title} Payment Manager`);
        let thead = $("<thead>");
        let trThead = $("<tr>");
        trThead.append($('<th class="name">Name</th>'));
        trThead.append($('<th class="category">Category</th>'));
        trThead.append($('<th class="price">Price</th>'));
        trThead.append($('<th>Actions</th>'));
        thead.append(trThead);

        this.tBody = $('<tbody class="payments">');

        let tfoot = $('<tfoot class="input-data">');
        let trTfoot = $("<tr>");
        trTfoot.append($('<td><input name="name" type="text"></td>'));
        trTfoot.append($('<td><input name="category" type="text"></td>'));
        trTfoot.append($('<td><input name="price" type="number"></td>'));
        trTfoot.append($("<td>")
            .append($('<button>Add</button>')
                .on("click", this._add.bind(this))
            ));
        tfoot.append(trTfoot);

        this.table.append(caption);
        this.table.append(thead);
        this.table.append(this.tBody);
        this.table.append(tfoot);
        return this.table;
    }

    _add() {
        let inputs = $(this.table).find("input").toArray();
        this.data = {name: inputs[0].value, category: inputs[1].value, price: inputs[2].value};

        if (this.data.name !== '' && this.data.category !== '' && this.data.price !== '' ) {

            this.trTbody = $("<tr>");
            let button = $('<button>Delete</button>');

            this.trTbody.append($('<td>').text(this.data.name));
            this.trTbody.append($('<td>').text(this.data.category));
            this.trTbody.append($('<td>').text(+this.data.price));
            this.trTbody.append($('<td>').append(button));

            $(this.table).find(this.tBody).append(this.trTbody);

            button.on("click", function (event) {
                console.log($(event.target).parent().parent().remove());
            });
            inputs[0].value = '';
            inputs[1].value = '';
            inputs[2].value = '';
        }
    }
}