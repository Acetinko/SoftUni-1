class SortedList {
    constructor() {
        this.data = [];
        this.size = 0;
    }

    add(element) {
        this.data.push(element);
        this.sort();
        this.size++;
    }

    remove(index) {
        if (index < 0 || index > this.data.length) {
            throw new TypeError('');
        }

        this.data.splice(index, 1);
        this.sort();

        this.size <= 0 ? this.size = 0 : this.size--;
    }

    get(index) {
        if (index >= 0 && index < this.data.length) {
            return this.data[index];
        }

        throw new TypeError('');
    }

    sort() {
        return this.data.sort((a, b) => a - b);
    }
}

module.exports = {SortedList};