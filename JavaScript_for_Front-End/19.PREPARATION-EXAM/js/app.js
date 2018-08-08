let isLogin = false;
let usernameElement = $('#username');

$('#set').on('click', function (ev) {

    if (usernameElement.val().trim().length === 0 && !isLogin) {
        return;
    }

    if (isLogin) {
        isLogin = false;
        ev.target.innerText = 'Set Username';
        usernameElement.val('');
    } else {
        isLogin = true;
        ev.target.innerText = 'Logout';
    }
});

$('#log').on('click', function (ev) {

    let messageElement = $('#message');
    let check = $('.form-check-input:checked').val();
    if (messageElement.val().trim().length === 0) {
        return;
    }

    switch (check) {
        case 'success':
            success(messageElement);
            break;
        case 'info':
            info(messageElement);
            break;
        case 'error':
            error(messageElement);
            break;
        default:
            break;
    }
});

function addLog(element, messageElement) {
    let messageLog = $('#messageLog');
    messageLog.removeClass('d-block');
    messageLog.addClass('d-none');
    $('.container-fluid .list-group').append(element);

    messageElement.val('');
    $('.form-check-input').prop('checked', false).parent().removeClass('active');
}

function success(messageElement) {
    let element = `<li class="list-group-item rounded bg-success mt-2">${messageElement.val()}</li>`;
    addLog(element, messageElement);
}

function info(messageElement) {
    let element = `<li class="list-group-item rounded bg-info mt-2">${messageElement.val()}</li>`;
    addLog(element, messageElement);
}

function error(messageElement) {
    let element = `<li class="list-group-item rounded bg-danger mt-2">${messageElement.val()}</li>`;
    addLog(element, messageElement);
}