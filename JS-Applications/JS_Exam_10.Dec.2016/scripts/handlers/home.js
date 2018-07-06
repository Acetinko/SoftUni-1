handlers.home = function () {
    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        notification: "./templates/common/notifications.hbs",
    };

    if (auth.isAuth()) {
        this.username = sessionStorage.getItem("username");
        content.page = "./templates/userHome.hbs";
    } else {
        //this.redirect("#");
        content.page = "./templates/appHome.hbs";
    }

    this.loadPartials(content).then(function () {
        this.partial("./templates/common/main.hbs");
    });
};