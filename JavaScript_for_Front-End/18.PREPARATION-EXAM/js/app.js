$('#firstName').on("change paste keyup", function () {
    let firstName = $(this).val().trim();
    if (firstName.length > 0) {
        output(firstName[0].toLowerCase(), 'firstName');
    }
});

$('#lastName').on("change paste keyup", function () {
    let lastName = $(this).val().trim();
    if (lastName.length > 0) {
        output(lastName.toLowerCase(), 'lastName');
    }
});

$('#branch').on("change paste keyup", function () {
    let branch = $(this).val().trim();
    if (branch.length > 0) {
        output(branch.toLowerCase(), 'branch');
    }
});

$('#company').on("change paste keyup", function () {
    let company = $(this).val().trim();
    if (company.length > 0) {
        output(company.toLowerCase(), 'company');
    }
});

function output(myString, type) {
    let [fName, lName, branch, company, user] = ['', '', '', '', '', ''];
    let print = $('#out');
    let myRegexp = /(.+)?\.(.+)?@(.+)?-(.+)?\.com/i;
    let match = myRegexp.exec(print.val());

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