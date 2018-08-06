$('#firstName').on("change paste keyup", function () {
    output($(this).val(), 'firstName');
});

$('#lastName').on("change paste keyup", function () {
    output($(this).val(), 'lastName');
});

$('#branch').on("change paste keyup", function () {
    output($(this).val(), 'branch');
});

$('#company').on("change paste keyup", function () {
    output($(this).val(), 'company');
});

function output(myString, type) {
    let [firstName, lastName, branch, company] = ['', '', '', '', ''];
    let print = $('#print');

    let myRegexp = /(.+)?\.(.+)?@(.+)?-(.+)?\.com/i;
    let match = myRegexp.exec(print.val());

    if (myString === undefined) {
        myString = '';
    } else {
        myString = myString.trim().toLowerCase();
    }

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

    switch (type) {
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