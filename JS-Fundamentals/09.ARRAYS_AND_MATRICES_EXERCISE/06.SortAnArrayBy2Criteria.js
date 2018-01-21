function sortAnArrayBy2Criteria(arrStr) {

    console.log(arrStr.sort(compare).join('\n'));

    function compare(a, b) {
        if (a.length < b.length) {
            return -1;
        } else if (a.length > b.length) {
            return 1;
        } else {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }

            return 0;
        }
    }
}

sortAnArrayBy2Criteria(['Input',
'Isacc',
'Theodor',
'Jack',
'Harrison',
'George'
]);