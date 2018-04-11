handlers.displayFeed = function (ctx) {
    let username = sessionStorage.getItem("username");
    ctx.isAuth = auth.isAuth();
    ctx.username = username;

    let subs = JSON.parse(sessionStorage.getItem("subscriptions"));
    subs = subs.map(e => `"${e}"`);

    let endpoint = `chirps?query={"author":{"$in": [${subs}]}}&sort={"_kmd.ect": 1}`;

    requester.get("appdata", endpoint, "kinvey").then((chirps) => {

        chirps.forEach(c => c.calcTime = calcTime(c._kmd.ect));
        ctx.chirps = chirps;

        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            menu: "./templates/common/menu.hbs",
            page: "./templates/feed.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs");
        });
    }).catch(notifications.handleError);
};

handlers.chirpPostAction = function (ctx) {
    let text = ctx.params.text.trim();

    if (!(/^.{1,150}/g).test(text)) {
        notifications.showError("A chirp text shouldn’t be empty and shouldn’t contain more than 150 symbols.");
        return;
    }

    let data = {
        text: text,
        author: sessionStorage.getItem("username")
    };

    requester.post("appdata", "chirps", "kinvey", data).then(() => {
        this.redirect("#/home");
        notifications.showInfo("Chirp published.");
    }).catch(notifications.handleError);
};

handlers.chirpDeleteAction = function (ctx) {
    let chirpId = ctx.params.id.substr(1);
    let endpoint = `chirps/${chirpId}`;

    requester.remove("appdata", endpoint, "kinvey").then(() => {
        notifications.showInfo("Chirp deleted.");
        this.redirect("#/feed");
    }).catch(notifications.handleError);
};

handlers.displayMe = function (ctx) {
    let username = sessionStorage.getItem("username");
    ctx.isAuth = auth.isAuth();
    ctx.username = username;
    let endpoint = `chirps?query={"author":{"$in": ["${username}"]}}&sort={"_kmd.ect": 1}`;

    requester.get("appdata", endpoint, "kinvey").then((chirps) => {

        ctx.chirps = chirps;

        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            menu: "./templates/common/menu.hbs",
            page: "./templates/me.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs");
        });
    }).catch(notifications.handleError);
};

handlers.displayDiscover = function (ctx) {
    let username = sessionStorage.getItem("username");
    ctx.isAuth = auth.isAuth();
    ctx.username = username;
    requester.get("user", '', "kinvey").then((discovers) => {

        for (let discover of discovers) {
            discover.followers = 0;
            for (let d in discover.subscriptions) {
                discover.followers++;
            }
        }

        ctx.discovers = discovers;

        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            menu: "./templates/common/menu.hbs",
            page: "./templates/discover.hbs"
        }).then(function () {
            this.partial("./templates/common/main.hbs");
        });
    }).catch(notifications.handleError);
};


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
