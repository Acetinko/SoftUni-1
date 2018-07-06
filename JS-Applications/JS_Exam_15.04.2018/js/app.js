const handlers = {};

$(() => {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");

        this.get("index.html", handlers.welcome);
        this.get("#/welcome", handlers.welcome);
        this.post("#/register", handlers.registerAction);
        this.post("#/login", handlers.loginAction);

        this.get("#/logout", handlers.logout);

        this.get("#/home", handlers.home);

        this.post("#/add/entry/:id", handlers.addEntry);

        this.get("#/del/:id", handlers.removeEntry);
        this.get("#/checkout/:id", handlers.checkout);

        this.get("#/all/receipt", handlers.allReceipt);
        this.get("#/overview", handlers.allReceipt);

        this.get("#/editor", handlers.home);

        this.get("/detail/:id", handlers.details);

    });

    app.run();
});