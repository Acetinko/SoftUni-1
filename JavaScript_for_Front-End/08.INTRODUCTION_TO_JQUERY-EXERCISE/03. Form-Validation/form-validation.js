function validate() {
    let isValidForm = false;
    let isCheckedBox = false;

    let username = $("#username");
    let email = $("#email");
    let password = $("#password");
    let confirmPassword = $("#confirm-password");
    let companyCheckBob = $("#company");
    let companyInfo = $("#companyInfo");
    let companyNumber = $("#companyNumber");
    let valid = $("#valid");

    $("#submit").on("click", function (ev) {
        ev.preventDefault();

        validationForm();
        printValid(valid);
    });

    companyCheckBob.on("change", function () {
        if (companyCheckBob.is(":checked")) {
            companyInfo.css("display", "block");
            isCheckedBox = true;
        } else {
            companyInfo.css("display", "none");
            isCheckedBox = false;
        }
    });

    function printValid(valid) {
        if (isValidForm) {
            valid.css("display", "block");
            isValidForm = false;
        } else {
            valid.css("display", "none");
        }
    }

    function validationForm() {
        let isValidUser = validationUsername();
        let isValidEmail = validationEmail();
        let isValidPass = validationPassword();
        let isValidCompanyNum = validationCompanyNumber();

        if (isCheckedBox) {
            isValidForm = isValidUser && isValidEmail && isValidPass && isValidCompanyNum;
        } else {
            isValidForm = isValidUser && isValidEmail && isValidPass;
        }
    }

    function validationUsername() {
        let isValidationInput = validationInput(username.val().trim(), /^[a-zA-Z0-9]{3,20}$/g);
        borderRedOrBlueInput(username, isValidationInput);

        return isValidationInput;
    }

    function validationEmail() {
        let isValidationInput = validationInput(email.val().trim(), /^.*?@.*?\..*$/g);
        borderRedOrBlueInput(email, isValidationInput);

        return isValidationInput;
    }

    function validationPassword() {
        let isConfirmPassword = false;
        let passStr = password.val().trim();
        let confPassStr = confirmPassword.val().trim();

        let isValidationInputPass = validationInput(passStr, /^\w{5,15}$/g);
        borderRedOrBlueInput(password, isValidationInputPass);
        borderRedOrBlueInput(confirmPassword, isValidationInputPass);

        if (isValidationInputPass) {
            isConfirmPassword = equalPassword(passStr, confPassStr);
            borderRedOrBlueInput(confirmPassword, isConfirmPassword);
        }

        return isValidationInputPass && isConfirmPassword;
    }

    function validationCompanyNumber() {
        let num = Number(companyNumber.val().trim());
        let isValidationInput = num >= 1000 && num <= 9999;
        borderRedOrBlueInput(companyNumber, isValidationInput);

        return isValidationInput;
    }

    function equalPassword(password, confirmPassword) {
        return password === confirmPassword && confirmPassword.length !== 0;
    }

    function validationInput(inputString, pattern) {
        return pattern.test(inputString);
    }

    function borderRedOrBlueInput(input, isValidationInput) {
        let borderType = isValidationInput ? "1px solid darkblue" : "1px solid red";
        input.css("border", borderType);
    }
}
