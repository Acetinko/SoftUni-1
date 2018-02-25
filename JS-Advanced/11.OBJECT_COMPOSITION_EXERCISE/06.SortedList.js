function getSortedList() {
    return {
        internalArray: [],
        size: 0,
        add: function (element) {
            this.internalArray.push(element);
            this.size++;
            this.sort();
        },
        remove: function (index) {
            if (index >= 0 && index < this.internalArray.length) {
                this.internalArray.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && index < this.internalArray.length) {
                return this.internalArray[index];
            }
        },
        toString: function () {
            return this.internalArray.join(', ')
        },
        sort: function () {
            this.internalArray = this.internalArray.sort((a, b) => a - b);
        }
    }
}

let sortedList = getSortedList();

console.log('size: ' + sortedList.size);
sortedList.add(2);
sortedList.add(-2);
sortedList.add(200);
sortedList.add(-22);
sortedList.add(32);
console.log('size: ' + sortedList.size);

console.log(sortedList.toString());
sortedList.remove(2); //200
console.log(sortedList.toString());

console.log(sortedList.get(1));
console.log(sortedList.toString());
console.log('size: ' + sortedList.size);
