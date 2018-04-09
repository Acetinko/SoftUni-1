const handlers = {};

$(() => {
    const app = Sammy("#app", function () {
        this.use("Handlebars", "hbs");

        this.get("messages.html", handlers.home);

        this.get("#/login", handlers.displayLogin);
        this.post("#/login", handlers.loginAction);

        this.get("#/logout", handlers.logout);

        this.get("#/register", handlers.displayRegister);
        this.post("#/register", handlers.registerAction);

        this.get("#/messages", handlers.myMessages);

        this.get("#/send", handlers.sendMessageDisplay);
        this.post("#/send", handlers.sendMessageAction);

        this.get("#/archive", handlers.archiveDisplay);
    });

    app.run();
});