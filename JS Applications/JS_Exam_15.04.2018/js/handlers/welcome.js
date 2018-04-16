handlers.welcome = function () {
    let content = {
        footer: "./templates/common/footer.hbs",
        page: "./templates/welcome.hbs",
        header : "./templates/common/header.hbs"
    };
    if (auth.isAuth()) {
        this.username = sessionStorage.getItem("username");
        this.isAuth = auth.isAuth();
        this.redirect("#/edit");
    }

    this.loadPartials(content).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};