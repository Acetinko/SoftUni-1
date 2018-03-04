function result() {
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

        toString() {
            let className = this.constructor.name;
            return `${className} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Student extends Person {
        constructor(name, email, course) {
            super(name, email);
            this._course = course;
        }

        set course(course) {
            this._course = course;
        }

        get course() {
            return this._course;
        }

        toString() {
            let baseStr = super.toString().slice(0, -1);
            return baseStr + `, course: ${this.course})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subject) {
            super(name, email);
            this._subject = subject;
        }

        set subject(subject) {
            this._subject = subject;
        }

        get subject() {
            return this._subject;
        }

        toString() {
            let baseStr = super.toString().slice(0, -1);
            return baseStr + `, subject: ${this._subject})`;
        }
    }

    return {Person, Student, Teacher}
}