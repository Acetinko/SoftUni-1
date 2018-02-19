function validate() {
    let isValid = true;
    let username = $("#username");
    let email = $("#email");
    let password = $("#password");
    let confirmPassword = $("#confirm-password");
    let companyCheckBox = $("#company");
    let companyInfo = $("#companyInfo");
    let companyNumber = $("#companyNumber");
    let submitBtn = $("#submit");
    let valid = $("#valid");

    companyCheckBox.on("change", function () {
        if (companyCheckBox.is(":checked")) {
            companyInfo.css("display", "block");
        } else {
            companyInfo.css("display", "none");
        }
    });

    submitBtn.on("click", function (event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        validateRegex(username, /^[A-Za-z0-9]{3,20}$/g);
        validateRegex(email, /^.*?@.*?\..*$/g);

        equalPassword(password, confirmPassword);

        if (companyInfo.css("display") === "block") {
            validateCompanyNumber(companyNumber);
        }

        if (isValid) {
            valid.css("display", "block");
        } else {
            valid.css("display", "none");
        }

        isValid = true;
    }

    function equalPassword(password, confirmPassword) {
        validateRegex(password, /^\w{5,15}$/g);

        if (password.val().trim() === confirmPassword.val().trim()) {
            validateRegex(confirmPassword, /^\w{5,15}$/g);
        } else {
            confirmPassword.css("border", "solid red");
            isValid = false;
        }
    }

    function validateRegex(input, pattern) {
        if (pattern.test(input.val().trim())) {
            input.css("border", "none");
        } else {
            input.css("border", "solid red");
            isValid = false;
        }
    }

    function validateCompanyNumber(companyNumber) {
        if (+companyNumber.val() >= 1000 && +companyNumber.val() <= 9999) {
            companyNumber.css("border", "none");
        } else {
            companyNumber.css("border", "solid red");
            isValid = false;
        }
    }
}
