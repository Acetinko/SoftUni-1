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

        this.get("#/", handlers.displayHome);
        this.get("#/feed", handlers.displayHome);

        this.post("#/chirp/post", handlers.chirpPostAction);
        this.get("#/chirp/del/:id", handlers.chirpDeleteAction);

        this.get("#/me", handlers.displayMe);

        this.get("#/discover", handlers.displayDiscover);

        this.get("#/profile/:id", handlers.profile);
        this.get("#/follow/:target", handlers.follow);
        this.get("#/unfollow/:target", handlers.unfollow);
    });

    app.run();
});

function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}