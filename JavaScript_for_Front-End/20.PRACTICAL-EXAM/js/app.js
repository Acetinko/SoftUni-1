start();

$('#check .form-check-inline').on('click', function (ev) {
    checkButton();
});

$('.personalInfo .h4').on('click', function (ev) {
    editInput(this.parentNode, ev.target.textContent);
});

$('#sbm').on('click', function () {
    start();
});

$('#reset').on('click', function () {
    start();
});

function start() {
    let personalObj = {firstName: 'Pesho', lastName: 'Peshov', phoneNumber: '555-333-4545', ucl: '9311124003'};
    $('#firstNameView').text(personalObj.firstName);
    $('#lastNameView').text(personalObj.lastName);
    $('#phoneNumberView').text(personalObj.phoneNumber);
    $('#uclView').text(personalObj.ucl);

    $('input[name=blankRadio]').prop('checked', true);
    $('input[name=blankChildRadio]').prop('checked', false);

    checkButton('');
}

function editInput(element, personal) {
    let h4 = $(element).children('h4');
    h4.removeClass('d-block');
    h4.addClass('d-none');

    let input = $(element).children('input');
    input.val(personal);
    input.removeClass('d-none');
    input.addClass('d-block');

    $(input).keypress(function (ev) {
        if (ev.which === 13) {
            h4.text(input.val());
            input.removeClass('d-block');
            input.addClass('d-none');
            h4.removeClass('d-none');
            h4.addClass('d-block');
        }
    });
}

function checkButton(command) {
    let positionObj = {
        support: ['Tech Support', 'Medical Support', 'Assistant Support'],
        crm: ['Community Manager', 'Customer Care Manager', 'Lead Administrative Officer'],
        marketing: ['PR Manager', 'Social Media Manager', 'Marketing Specialist'],
        development: ['Junior Developer', 'Regular Developer', 'Senior Developer'],
        other: ['Team Lead', 'Regular Employee', 'Intern']
    };

    let check = $(".form-check-input[name='blankRadio']:checked").val();

    if (command === 'other') {
        check = command;
    }

    switch (check) {
        case 'support':
            positionPrint(positionObj.support);
            break;
        case 'crm':
            positionPrint(positionObj.crm);
            break;
        case 'marketing':
            positionPrint(positionObj.marketing);
            break;
        case 'development':
            positionPrint(positionObj.development);
            break;
        case 'other':
            positionPrint(positionObj.other);
            break;
        default:
            break;
    }
}

function positionPrint(positionArr) {
    $('#viewRadioView1').text(positionArr[0]);
    $('#viewRadioView2').text(positionArr[1]);
    $('#viewRadioView3').text(positionArr[2]);
    $('input[name=blankChildRadio]').prop('checked', false);
}