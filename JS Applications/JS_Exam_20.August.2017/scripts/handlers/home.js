handlers.home = function () {
    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs"
    };

    if (auth.isAuth()) {
        this.username = sessionStorage.getItem("username");
        //content.page = "./templates/catalogLists.hbs";
        this.redirect("#/catalog");
    } else {
        content.page = "./templates/welcome.hbs";
    }

    this.loadPartials(content).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};