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

    auth.login(username, password)
        .then((userInfo) => {
            auth.saveSession(userInfo);
            ctx.redirect("#");
            notifications.showInfo("Login successful!");
        }).catch(notifications.handleError);
};

handlers.logout = function (ctx) {
    auth.logout().then(() => {
        sessionStorage.clear();
        ctx.redirect("#");
        notifications.showInfo("Logout successful.");
    }).catch(notifications.handleError);
};

handlers.displayRegister = function (ctx) {
    this.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/logoutMenu.hbs",
        page: "./templates/register.hbs"
    }).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};

handlers.registerAction = function (ctx) {
    let {username, password, repeatPass} = this.params;

    if (password.trim() !== repeatPass.trim()) {
        notifications.showError("Password not match!");
        return;
    }

    auth.register(username, password)
        .then((userInfo) => {
            auth.saveSession(userInfo);
            ctx.redirect("#");
            notifications.showInfo("User registration successful!");
        }).catch(notifications.handleError);
};