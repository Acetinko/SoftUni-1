handlers.loginAction = function (ctx) {
    let username = this.params['username-login'];
    let password = this.params['password-login'];

    auth.login(username, password).then((userInfo) => {
        auth.saveSession(userInfo);
        this.redirect("#/editor");
        notifications.showInfo("Login successful.");
    }).catch(notifications.handleError);
};

handlers.logout = function (ctx) {
    auth.logout().then(() => {
        sessionStorage.clear();
        this.redirect("#/welcome");
        notifications.showInfo("Logout successful.");
    }).catch(notifications.handleError);
};

handlers.registerAction = function (ctx) {
    let username = this.params['username-register'];
    let password = this.params['password-register'];
    let repeatPass = this.params['password-register-check'];

    if (!(username.length >= 5)) {
        notifications.showError('A username should be a string with at least 5 characters long.');
        return;
    }

    if (password.trim() === '') {
        notifications.showError('Passwords input fields shouldn’t be empty.');
        return;
    }

    if (repeatPass !== password) {
        notifications.showError('Both passwords should match.');
        return;
    }

    auth.register(username, password, []).then((userInfo) => {
        auth.saveSession(userInfo);
        this.redirect("#/editor");
        notifications.showInfo("User registration successful.");
    }).catch(notifications.handleError);
};