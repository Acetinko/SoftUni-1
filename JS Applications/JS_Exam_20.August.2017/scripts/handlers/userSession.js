handlers.loginAction = function (ctx) {
    let {username, password} = this.params;

    auth.login(username, password)
        .then((userInfo) => {
            auth.saveSession(userInfo);
            ctx.redirect("#/catalog");
            notifications.showInfo("Login successful!");
        }).catch(notifications.handleError);
};

handlers.registerAction = function (ctx) {
    let {username, password, repeatPass} = this.params;
    username = username.trim();
    password = password.trim();
    repeatPass = repeatPass.trim();

    if (!(/[A-Za-z]{3,}/g).test(username)) {
        notifications.showError(
            "A username should be at least 3 characters long and should contain only english alphabet letters."
        );
        return;
    }
    if (!(/[A-Za-z0-9]{6,}/g).test(password)) {
        notifications.showError(
            "A user‘s password should be at least 6 characters long and should contain only english alphabet letters and digits."
        );
        return;
    }
    if (password !== repeatPass) {
        notifications.showError("Both passwords should match!");
        return;
    }

    auth.register(username, password)
        .then((userInfo) => {
            auth.saveSession(userInfo);
            ctx.redirect("#/catalog");
            notifications.showInfo("User registration successful!");
        }).catch(notifications.handleError);
};

handlers.logout = function (ctx) {
    auth.logout().then(() => {
        sessionStorage.clear();
        ctx.redirect("#");
        notifications.showInfo("Logout successful.");
    }).catch(notifications.handleError);
};