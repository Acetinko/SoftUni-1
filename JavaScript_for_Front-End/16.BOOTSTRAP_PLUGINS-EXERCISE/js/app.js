$('.btn.btn-facebook').on('click', function (ev) {
    socialButton('http://facebook.com');
});

$('.btn.btn-google').on('click', function (ev) {
    socialButton('http://google.com');
});

$('.dropify').dropify();

$('.btn.btn-info').on('click', function (ev) {
    swal("Good job!", "You are registered!", "success");

    clearAllInput();
});

function socialButton(url) {
    swal({
            title: "Leave this site?",
            text: `If you click 'OK', you will be redirected to ${url}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "OK",
            closeOnConfirm: true
        },
        function () {
            swal();
            if (url === 'http://google.com') {
                href = `https://accounts.google.com/signup`;
            } else if (url === 'http://facebook.com') {
                href = `${url}/signup`;
            }
            window.open(`${href}`, 'mywin', 'left=50,top=80,width=600,height=600');
        });
}

function clearAllInput() {
    let enterYourDataInput = $('.form-group .form-control');
    for (const enterYourDataInputElement of enterYourDataInput) {
        $(enterYourDataInputElement).val('');
    }

    let socialMediaProfilesInput = $('.input-group-sm .form-control');
    for (const socialMediaProfile of socialMediaProfilesInput) {
        $(socialMediaProfile).val('');
    }

    $(".dropify-clear").click();
}