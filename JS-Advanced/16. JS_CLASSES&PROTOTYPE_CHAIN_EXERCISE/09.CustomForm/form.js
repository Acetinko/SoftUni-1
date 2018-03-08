let result = (function () {

    class Textbox {
        constructor(selector, regex) {
            this._elements = $(selector);
            this._value = $(this._elements[0]).val();
            this._invalidSymbols = regex;
            this.onInput();
        }

        get elements() {
            return this._elements;
        }

        get value() {
            return this._value;
        }

        set value(value) {
            this._value = value;

            for (let element of this.elements) {
                $(element).val(value);
            }
        }

        onInput() {
            this.elements.on("input", (event) => {
                this.value = $(event.target).val();
            });
        }

        isValid() {
            return !this._invalidSymbols.test(this.value);
        }
    }

    class Form {
        constructor() {
            // div with class form
            this._elements = $("<div>").addClass("form");
            this.textBoxes = arguments;
        }

        get textBoxes() {
            return this._textBoxes;
        }

        set textBoxes(value) {
            this._textBoxes = value;

            for (let argument of this._textBoxes) {
                if (!argument instanceof Textbox) {
                    throw new Error("not a Textbox");
                }

            }

            for (let argument of this._textBoxes) {
                for (let element of argument._elements) {
                    this._elements.append($(element));
                }
            }
        }

        submit() {
            let isAllValid = true;
            for (let textBox of this._textBoxes) {
                if (textBox.isValid()) {
                    for (let element of textBox._elements) {
                        $(element).css("border", "2px solid green");
                    }
                } else {
                    for (let element of textBox._elements) {
                        $(element).css("border", "2px solid red");
                    }
                    isAllValid = false;
                }
            }

            return isAllValid;
        }

        attach(selector) {
            $(selector).append(this._elements);
        }
    }

    return {
        Textbox: Textbox,
        Form: Form
    }
}());

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username", /[^a-zA-Z0-9]/);
let password = new Textbox("#password", /[^a-zA-Z]/);
let email = new Textbox("#email", /.*/);
username.value = "username";
password.value = "password";
email.value = "user@abd.com";
let form = new Form(username, password, email);
form.attach("#root");
