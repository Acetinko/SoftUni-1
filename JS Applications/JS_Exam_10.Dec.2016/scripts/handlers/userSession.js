handlers.displayLogin = function () {
    this.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        notification: "./templates/common/notifications.hbs",
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
        notification: "./templates/common/notifications.hbs",
        page: "./templates/register.hbs"
    }).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};

handlers.registerAction = function (ctx) {
    let {username, password, name} = this.params;

    auth.register(username, password, name)
        .then((userInfo) => {
            auth.saveSession(userInfo);
            ctx.redirect("#");
            notifications.showInfo("Registration successful!");
        }).catch(notifications.handleError);
};