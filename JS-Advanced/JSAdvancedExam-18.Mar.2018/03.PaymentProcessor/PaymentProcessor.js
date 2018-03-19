class PaymentProcessor {
    constructor(optional = '') {
        this.data = new Map();
        this.type = {
            types: ["service", "product", "other"],
            precision: 2
        };

        this.setOptions(optional);
    }

    registerPayment(id, name, type, value) {
        this._validateInputID(id);
        this._validateName(name);
        this._validateType(type);
        this._validateValue(value);
        this.data.set(id, {id: id, name: name, type: type, value: value});
    }

    deletePayment(id) {
        this._validateInputID(id);
        this._validateExistId(id);
        this.data.delete(id);
    }

    get(id) {
        this._validateInputID(id);
        this._validateExistId(id);
        return `Details about payment ID: ${id}\n` +
            `- Name: ${this.data.get(id).name}\n` +
            `- Type: ${this.data.get(id).type}\n` +
            `- Value: ${this.data.get(id).value.toFixed(this.type.precision)}\n`;

    }

    setOptions(options) {
        this._validateOption(options);

        for (let option of options) {
            if (option.types !== undefined) {
                this.type.types = options.types;
            }

            if (option.precision !== undefined) {
                this.type.precision = options.precision;
            }
        }
    }

    toString() {
        let total = 0;
        for (let obj of this.data) {
            total += Number(obj[1].value);
        }

        return `Summary:\n- Payments: ${this.data.size}\n- Balance: ${total.toFixed(this.type.precision)}`;
    }

    _validateInputID(id) {
        if (id.length === 0 || typeof id !== "string") {
            throw new Error(`non-valid ${id}`);
        }
    }

    _validateExistId(id){
        if (!this.data.has(id)) {
            throw new Error(`ID not found`);
        }
    }

    _validateName(name) {

        if (name.length === 0 || typeof name !== "string") {
            throw new Error(`non-valid ${name}`);
        }
    }

    _validateType(type) {
        if (this.type.types.indexOf(type) < 0) {
            throw new Error(`non-valid type ${type}`);
        }
    }

    _validateValue(value){
        if (typeof value !== "number") {
            throw new Error(`non-valid ${value}`);
        }
    }

    _validateOption(options){

        if () {
            
        }
        if (typeof options == "object") {
            if (typeof option !== "object") {
                throw new Error(`non-valid ${option}`);
            }            
        }
        
        for (let option of options) {
            if (typeof option !== "object") {
                throw new Error(`non-valid ${option}`);
            }
        }

    }
}

//// Initialize processor with default options
//const generalPayments = new PaymentProcessor();
//generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
//generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
//console.log(generalPayments.toString());
//
//// Should throw an error (invalid type)
////generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);
//
//generalPayments.setOptions({types: ['product', 'material']});
////generalPayments.setOptions({precision: 3});
//generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
//console.log(generalPayments.get('E028'));
//generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);
//
//// Should throw an error (ID not found)
////generalPayments.deletePayment('E027');
//// Should throw an error (ID not found)
////generalPayments.get('E027');
//
//generalPayments.deletePayment('E028');
//console.log(generalPayments.toString());
//
//// Initialize processor with custom types
//const servicePyaments = new PaymentProcessor({types: ['service']});
//servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
//servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
//console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
//const transactionLog = new PaymentProcessor();
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.type.precision);
console.log(transactionLog.toString());
