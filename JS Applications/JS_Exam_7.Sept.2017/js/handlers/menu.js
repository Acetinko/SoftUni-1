handlers.menu = function () {
    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        page: "./templates/login.hbs",
    };

    if (auth.isAuth()) {
        this.username = sessionStorage.getItem("username");
        content.menu = "./templates/common/menu.hbs";
    } else {
        this.redirect("#/login");
    }

    this.loadPartials(content).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};