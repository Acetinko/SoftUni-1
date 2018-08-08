let isLogin = false;
let username = '';

$('#set').on('click', function (ev) {
    let usernameElement = $('#username');

    if (usernameElement.val().trim().length === 0 && !isLogin) {
        return;
    }

    if (isLogin) {
        isLogin = false;
        ev.target.innerText = 'Set Username';
        usernameElement.val('');
        username = '';
    } else {
        isLogin = true;
        ev.target.innerText = 'Logout';
        username = usernameElement.val();
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

$('.container .list-group').on('click', function (ev) {
    let id = ev.target.id;
    if (id === 'archive') {
        archiveElement(ev.target);
    }
});

function addLogElement(element, messageElement) {
    let messageLog = $('#messageLog');
    if (messageLog.hasClass('d-block')) {
        messageLog.removeClass('d-block');
        messageLog.addClass('d-none');
    }

    let user = username.length !== 0 ? username : 'Anonymous';

    $(element).append($(`<div class="col-8 mt-auto mb-auto text-left">${messageElement.val()}</div>
                <div class="border border-dark"></div>
                <div class="col-1 p-0 m-auto">${user}</div>
                <div class="border border-dark"></div>
                <div class="col-1 p-0 m-auto">
                    <a href="#" id="archive" class="btn text-light border-0">Archive</a>
                </div>`
    )).appendTo($('.container .list-group'));

    messageElement.val('');
    $('.form-check-input').prop('checked', false).parent().removeClass('active');
}

function success(messageElement) {
    let element = `<li class="row list-group-item rounded bg-success mt-2 h-25"></li>`;
    addLogElement(element, messageElement);
}

function info(messageElement) {
    let element = `<li class="row list-group-item rounded bg-info mt-2 h-25"></li>`;
    addLogElement(element, messageElement);
}

function error(messageElement) {
    let element = `<li class="row list-group-item rounded bg-danger mt-2 h-25"></li>`;
    addLogElement(element, messageElement);
}

function archiveElement(element) {
    let liElement = element.parentNode.parentNode.parentNode;
    element.parentNode.parentNode.remove();

    if ($(liElement).children().length > 0) {
        return;
    }

    let messageLog = $('#messageLog');
    if (messageLog.hasClass('d-none')) {
        messageLog.removeClass('d-none');
        messageLog.addClass('d-block');
    }
}