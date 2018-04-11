handlers.menu = function () {
    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        page: "./templates/common/pageEmpty.hbs",
    };

    if (auth.isAuth()) {
        this.username = sessionStorage.getItem("username");
        content.menu = "./templates/common/loginMenu.hbs";
    } else {
        //this.redirect("#");
        content.menu = "./templates/common/logoutMenu.hbs";
    }

    this.loadPartials(content).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};