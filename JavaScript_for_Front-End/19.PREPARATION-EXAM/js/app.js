let isLogin = false;
let username = '';

$('#login').on('click', function (ev) {
    let usernameElement = $('#username');

    if (usernameElement.val().trim().length === 0 && !isLogin) {
        return;
    }

    if (isLogin) {
        isLogin = false;
        ev.target.innerText = 'Set Username';

        $(ev.target).removeClass('pl-4');
        $(ev.target).removeClass('pr-4');
        $(ev.target).addClass('pl-2');
        $(ev.target).addClass('pr-2');

        usernameElement.val('');
        username = '';
    } else {
        isLogin = true;
        ev.target.innerText = 'Logout';

        $(ev.target).removeClass('pl-2');
        $(ev.target).removeClass('pr-2');
        $(ev.target).addClass('pl-4');
        $(ev.target).addClass('pr-4');

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
            successLog(messageElement);
            break;
        case 'info':
            infoLog(messageElement);
            break;
        case 'error':
            errorLog(messageElement);
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

function addLogElement(message, bgColor, messageElement) {
    let messageLog = $('#messageLog');
    if (messageLog.hasClass('d-block')) {
        messageLog.removeClass('d-block');
        messageLog.addClass('d-none');
    }

    let user = username.length !== 0 ? username : 'Anonymous';

    $(`<li class="row list-group-item rounded bg-${bgColor} ml-4 mr-4 mt-2 pl-0 pr-0 pt-1 pb-1">
                <div class="col-8 mt-auto mb-auto text-left">${message}</div>
                <div class="border border-dark"></div>
                <div class="col-1 p-0 m-auto text-center">${user}</div>
                <div class="border border-dark"></div>
                <div class="col-1 p-0 m-auto">
                    <a href="#" id="archive" class="btn text-light border-0 m-auto text-center">Archive</a>
                </div>
        </li>`
    ).appendTo($('.container .list-group'));

    messageElement.val('');
    $('.form-check-input').prop('checked', false).parent().removeClass('active');
}

function successLog(messageElement) {
    addLogElement(`Success: ${messageElement.val()}`, 'success', messageElement);
}

function infoLog(messageElement) {
    addLogElement(`Info: ${messageElement.val()}`, 'info', messageElement);
}

function errorLog(messageElement) {
    addLogElement(`Error: ${messageElement.val()}`, 'danger', messageElement);
}

function archiveElement(element) {
    let ulElement = element.parentNode.parentNode.parentNode;
    element.parentNode.parentNode.remove();

    if ($(ulElement).children().length > 0) {
        return;
    }

    let messageLog = $('#messageLog');
    if (messageLog.hasClass('d-none')) {
        messageLog.removeClass('d-none');
        messageLog.addClass('d-block');
    }
}