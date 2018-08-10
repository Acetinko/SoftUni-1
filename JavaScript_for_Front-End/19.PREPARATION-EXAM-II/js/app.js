let username = '';

$('#sbm').on('click', function (ev) {
    let inputUsername = $('#username');
    let sbm = $('#sbm');
    let printUsername = $('#printUsername');
    username = inputUsername.val().trim();

    if (username.length > 0 && sbm.text() === 'Set Username') {
        sbm.text('Logout');
        printUsername.removeClass('d-none');
        printUsername.addClass('d-block');
        printUsername.text(username);
        inputUsername.addClass('d-none');
        inputUsername.
    } else {
        sbm.text('Set Username');
        printUsername.addClass('d-none');
        printUsername.removeClass('d-block');
        printUsername.text('');
        inputUsername.val('');
        username = ''
    }
});