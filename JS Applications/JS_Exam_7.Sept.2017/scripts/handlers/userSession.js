handlers.displayLogin = function () {
    this.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        page: "./templates/login.hbs"
    }).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};

handlers.loginAction = function (ctx) {
    let {username, password} = this.params;

    auth.login(username, password).then((userInfo) => {
            auth.saveSession(userInfo);
            ctx.redirect("#/home");
            notifications.showInfo("Login successful!");
        }).catch(notifications.handleError);
};

handlers.logout = function (ctx) {
    auth.logout().then(() => {
        sessionStorage.clear();
        ctx.redirect("#/login");
        notifications.showInfo("Logout successful.");
    }).catch(notifications.handleError);
};

handlers.displayRegister = function (ctx) {
    this.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        page: "./templates/register.hbs"
    }).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};

handlers.registerAction = function (ctx) {
    let {username, password, repeatPass} = this.params;

    if (!/^[A-Za-z]{5,}$/.test(username)) {
        notify.showError('A username should be a string with at least 5 characters long');
        return;
    }

    if (password.trim() === '') {
        notify.showError('Passwords input fields shouldn’t be empty');
        return;
    }

    if (repeatPass !== password) {
        notify.showError('Passwords must match!');
        return;
    }

    auth.register(username, password, []).then((userInfo) => {
            auth.saveSession(userInfo);
            ctx.redirect("#");
            notifications.showInfo("User registration successful!");
        }).catch(notifications.handleError);
};