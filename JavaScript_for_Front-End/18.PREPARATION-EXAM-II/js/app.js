let obj = {firstName: '', lastName: '', branch: '', company: ''};

$("#firstName").keyup(function (ev) {
    let text = $(ev.target).val().trim();

    if (text.length > 0) {
        obj.firstName = text[0].toLowerCase();
    } else {
        obj.firstName = '';
    }

    printResult();
});

$("#lastName").keyup(function (ev) {
    let text = $(ev.target).val().trim();

    if (text.length > 0) {
        obj.lastName = inputRegex(text);
    } else {
        obj.lastName = '';
    }

    printResult();
});

$("#branch").keyup(function (ev) {
    let text = $(ev.target).val().trim();

    if (text.length > 0) {
        obj.branch = inputRegex(text);
    } else {
        obj.branch = '';
    }

    printResult()
});

$("#company").keyup(function (ev) {
    let text = $(ev.target).val().trim();

    if (text.length > 0) {
        obj.company = inputRegex(text);
    } else {
        obj.company = '';
    }

    printResult();
});

function inputRegex(text) {
    let inputRegex = new RegExp("[a-zA-Z0-9_]+", "g");
    let myStr = '';
    let result;

    while (result = inputRegex.exec(text)) {
        myStr += result;
    }

    return myStr.toLowerCase();
}

function printResult() {
    $('#result').val(`${obj.firstName}.${obj.lastName}@${obj.branch}-${obj.company}.com`);
}