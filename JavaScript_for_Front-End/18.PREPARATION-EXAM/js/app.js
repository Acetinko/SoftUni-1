$('#firstName').on("change paste keyup", function () {
    let firstName = $(this).val().trim();
    output(firstName[0], 'firstName');
});

$('#lastName').on("change paste keyup", function () {
    let lastName = $(this).val().trim();
    output(lastName, 'lastName');
});

$('#branch').on("change paste keyup", function () {
    let branch = $(this).val().trim();
    output(branch, 'branch');
});

$('#company').on("change paste keyup", function () {
    let company = $(this).val().trim();
    output(company, 'company');
});

function output(myString, type) {
    let [fName, lName, branch, company, user] = ['', '', '', '', '', ''];
    let print = $('#out');
    let myRegexp = /(.+)?\.(.+)?@(.+)?-(.+)?\.com/i;
    let match = myRegexp.exec(print.val());

    if (myString === undefined) {
        myString = '';
    }

    myString = myString.toLowerCase();

    if (match !== null) {

        if (match[1]) {
            fName = match[1];
        }

        if (match[2]) {
            lName = match[2];
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
            fName = myString;
            break;
        case 'lastName':
            lName = myString;
            break;
        case 'branch':
            branch = myString;
            break;
        case 'company':
            company = myString;
            break;
    }

    user = fName + '.' + lName + '@' + branch + '-' + company + '.com';

    print.val(user);
}