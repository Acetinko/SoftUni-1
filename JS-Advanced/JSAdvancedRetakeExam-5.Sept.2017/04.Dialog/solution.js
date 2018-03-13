class Dialog {
    constructor(message, callback) {
        this.message = message;
        this.callback = callback;
        this.inputs = [];
    }

    addInput(label, name, type) {
        this.inputs.push({label, name, type});
    }

    render() {
        this.overlayDiv = $('<div class="overlay">');
        let innerDiv = $('<div class="dialog">');
        innerDiv.append(`<p>${this.message}</p>`);

        for (let obj of this.inputs) {
            innerDiv.append(`<label>${obj.label}</label>`);
            innerDiv.append(`<input name="${obj.name}" type="${obj.type}">`)
        }

        innerDiv.append($('<button>OK</button>')
            .on('click', this._ok.bind(this)));
        innerDiv.append($('<button>Cancel</button>')
            .on('click', this._cancel.bind(this)));

        this.overlayDiv.append(innerDiv);
        $('body').append(this.overlayDiv)
    }

    _cancel() {
        $(this.overlayDiv).remove();
    }

    _ok() {
        let obj = {};
        let inputs = $(this.overlayDiv).find('input').toArray();
        inputs.forEach(i => obj[$(i).attr('name')] = $(i).val());
        this.callback(obj);
        this._cancel();
    }
}