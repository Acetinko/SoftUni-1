const handlers = {};

$(() => {
    const app = Sammy("#main", function () {
        this.use("Handlebars", "hbs");

        this.get("index.html", handlers.menu);

        this.get("#/login", handlers.displayLogin);
        this.post("#/login", handlers.loginAction);

        this.get("#/logout", handlers.logout);

        this.get("#/register", handlers.displayRegister);
        this.post("#/register", handlers.registerAction);

        this.get("#/home", handlers.displayFeed);
        this.get("#/feed", handlers.displayFeed);

        this.post("#/chirp/post", handlers.chirpPostAction);
        this.get("#/chirp/del/:id", handlers.chirpDeleteAction);

        this.get("#/me", handlers.displayMe);

        this.get("#/discover", handlers.displayDiscover);
        //this.post("#/send", handlers.sendMessageAction);

        //this.get("#/archive", handlers.archiveDisplay);
    });

    app.run();
});