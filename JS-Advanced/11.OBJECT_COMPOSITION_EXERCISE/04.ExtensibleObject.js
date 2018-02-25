function extensibleObject() {
    return {
        extend: function (template) {

            for (let key in template) {

                if (template.hasOwnProperty(key)) {
                    let element = template[key];

                    if (typeof element === "function") {
                        this.__proto__[key] = element;
                    } else {
                        this[key] = element;
                    }
                }
            }
        }
    };
}

let myObj = extensibleObject();

let template = {
    extensionMethod: function () {
        console.log("TEST");
    },
    extensionProperty: 'someString'
};

myObj.extend(template);

console.log(myObj);
console.log(Object.getPrototypeOf(myObj));
