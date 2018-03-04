//function result() {
    class Person {
        constructor(name, email) {
            this._name = name;
            this._email = email;
        }

        set name(name) {
            this._name = name;
        }

        get name() {
            return this._name;
        }

        set email(email) {
            this._email = email;
        }

        get email() {
            return this._email;
        }

        toString(){
            let className = this.constructor.name;
            return `${className} (${this.name} ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(teacherName, teacherEmail, subject) {
            super(teacherName, teacherEmail);
            this._subject = subject;
        }

        set subject(subject) {

            this._subject = subject;
        }

        get subject() {
            return this._subject;
        }

        toString() {
            let parent = super.toString().slice(0, -1);
            return `${parent} ${this.subject})`;
        }

    }

  //  return {Person, Teacher}
//}


let p = new Person("Peter", "peter@kio.lok");
let t = new Teacher("Peter", "peter@kio.lok", "Hello");

console.log(p.toString());
console.log(t.toString());

console.dir(Object.getPrototypeOf(t)); //Teacher {}
console.dir(Object.getPrototypeOf(Teacher)); // [Function: Person]
console.dir(Object.getPrototypeOf(t) === Teacher.prototype); // true
console.dir(Teacher.prototype.toString); // [Function: toString]
console.dir(Object.getPrototypeOf(Teacher.prototype)); // Person {}

