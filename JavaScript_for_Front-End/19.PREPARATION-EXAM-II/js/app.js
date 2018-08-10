let username = 'Anonymous';

$('#sbm').on('click', function (ev) {
    let inputUsername = $('#username');
    let sbm = $('#sbm');
    let printUsername = $('#printUsername');
    username = inputUsername.val().trim();

    if (username.length > 0 && sbm.text() === 'Set Username') {
        sbm.text('Logout');
        inputUsername.removeClass('d-block');
        inputUsername.addClass('d-none');

        printUsername.removeClass('d-none');
        printUsername.addClass('d-block');
        printUsername.text(username);
    } else {
        sbm.text('Set Username');

        inputUsername.removeClass('d-none');
        inputUsername.addClass('d-block');
        inputUsername.val('');

        printUsername.addClass('d-none');
        printUsername.removeClass('d-block');
        printUsername.text('');

        username = 'Anonymous'
    }
});

$('#addLog').on('click', function (ev) {
    let messageElement = $('#message');
    if (messageElement.val().trim().length === 0) {
        return;
    }

    let logsView = $('#logsView');
    let check = $( ".form-check-input[name='blankRadio']:checked").val();
    switch (check) {
        case 'success':
            logsView.append(
            createElement(check, `Success: ${messageElement.val().trim()}`)
            );
            break;
        case 'info':
            logsView.append(
            createElement(check, `Info: ${messageElement.val().trim()}`)
            );
            break;
        case 'danger':
            logsView.append(
            createElement(check, `Error: ${messageElement.val().trim()}`)
            );
            break;
        default:
            break;
    }

    verificationEmptyDB();
    messageElement.val('');
});

$('#logsView').on('click', function (ev) {
    let element = $(ev.target);
    if (element.text() === 'Archive') {
        element.parent().remove();
    }

    verificationEmptyDB();
});

function verificationEmptyDB() {
    let logsView = $('#logsView');
    let emptyDb = $('#emptyDb');

    if (logsView.children().length > 0 && emptyDb.hasClass('d-block')) {
        emptyDb.removeClass('d-block');
        emptyDb.addClass('d-none');

        logsView.removeClass('d-none');
        logsView.addClass('d-block');
    }

    if (logsView.children().length === 0 ) {
        emptyDb.removeClass('d-none');
        emptyDb.addClass('d-block');

        logsView.removeClass('d-block');
        logsView.addClass('d-none');
    }
}

function createElement(type, message) {
    return $(`<div class="row bg-${type} text-white rounded py-2 mb-2">
        <div class="col-6 h3 mt-auto mb-auto">${message}</div>
        <div class="col-3 text-center border-left border-right border-dark">
            <h3 class="h3">${username}</h3></div>
        <div class="col-3 h3 archive text-center">Archive</div>
    </div>`);
}