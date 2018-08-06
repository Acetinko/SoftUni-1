$('#firstName').on("change paste keyup", function () {
    output($(this).val(), this.id);
});

$('#lastName').on("change paste keyup", function () {
    output($(this).val(), this.id);
});

$('#branch').on("change paste keyup", function () {
    output($(this).val(), this.id);
});

$('#company').on("change paste keyup", function () {
    output($(this).val(), this.id);
});

function output(inputStr, idName) {
    let [firstName, lastName, branch, company, myString] = ['', '', '', '', '', ''];
    let print = $('#print');

    if (inputStr !== undefined) {

        let inputRegex = new RegExp("[a-zA-Z0-9_]+", "g");
        let result;
        while (result = inputRegex.exec(inputStr)) {
            myString += result;
        }

        myString = myString.toLowerCase();
    }

    let myRegexp = /(.+)?\.(.+)?@(.+)?-(.+)?\.com/i;
    let match = myRegexp.exec(print.val());

    if (match !== null) {
        if (match[1]) {
            firstName = match[1];
        }

        if (match[2]) {
            lastName = match[2];
        }

        if (match[3]) {
            branch = match[3];
        }

        if (match[4]) {
            company = match[4];
        }
    }

    switch (idName) {
        case 'firstName':
            firstName = myString[0];
            break;
        case 'lastName':
            lastName = myString;
            break;
        case 'branch':
            branch = myString;
            break;
        case 'company':
            company = myString;
            break;
    }

    print.val(firstName + '.' + lastName + '@' + branch + '-' + company + '.com');
}