handlers.displayHome = function (ctx) {
    let username = sessionStorage.getItem("username");
    ctx.isAuth = auth.isAuth();
    ctx.username = username;

    this.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/feed.hbs"
    }).then(function () {
        ctx.partials = this.partials;
        ctx.partial("./templates/common/main.hbs");

        service.getStats(username).then((stats) => {
            let [countCirps, countFollowing, countFollowers] = stats;

            ctx.render("./templates/common/stats.hbs", {countCirps, countFollowing, countFollowers}).then(function () {
                this.replace("#userStats");
            });
        }).catch(notifications.handleError);

        service.getChipsFromSubs().then((chirps) => {
            chirps.map(c => {
                c.calcTime = calcTime(c._kmd.ect);
                c.isAuthor = c._acl.creator === sessionStorage.getItem('userId')
            });

            ctx.chirps = chirps;

            ctx.render("./templates/common/chirpList.hbs", {chirps}).then(function () {
                this.replace("#chirps");
            });
        }).catch(notifications.handleError);
    });
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
        this.redirect("#/me");
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

    this.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/me.hbs"
    }).then(function () {
        ctx.partials = this.partials;
        ctx.partial("./templates/common/main.hbs");

        service.getStats(username).then((stats) => {
            let [countCirps, countFollowing, countFollowers] = stats;

            ctx.render("./templates/common/stats.hbs", {countCirps, countFollowing, countFollowers}).then(function () {
                this.replace("#myStats");
            });
        }).catch(notifications.handleError);

        service.getChipsByUser().then((chirps) => {
            chirps.map(c => {
                c.calcTime = calcTime(c._kmd.ect);
                c.isAuthor = c._acl.creator === sessionStorage.getItem('userId')
            });

            ctx.chirps = chirps;

            ctx.render("./templates/common/chirpList.hbs", {chirps}).then(function () {
                this.replace("#myChirps");
            });
        }).catch(notifications.handleError);
    });
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

handlers.profile = function (ctx) {
    ctx.isAuth = auth.isAuth();
    let userId = ctx.params.id.substr(1);

    this.loadPartials({
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/profile.hbs"
    }).then(function () {
        ctx.partials = this.partials;

        service.getUserById(userId).then((userInfo) => {
            let username = userInfo[0].username;

            service.getStats(username).then((stats) => {
                let [countCirps, countFollowing, countFollowers] = stats;

                ctx.render("./templates/common/stats.hbs", {
                    countCirps,
                    countFollowing,
                    countFollowers
                }).then(function () {
                    this.replace("#userProfileStats");
                });
            }).catch(notifications.handleError);

            service.getChipsByUser(username).then((chirps) => {
                chirps.map(c => {
                    c.calcTime = calcTime(c._kmd.ect);
                    c.isAuthor = false
                });
                ctx.render("./templates/common/chirpList.hbs", {chirps}).then(function () {
                    this.replace("#profileChirps");
                });
            }).catch(notifications.handleError);

            ctx.target = username;
            ctx.username = username;
            ctx.isFollowing = (sessionStorage.getItem('subscriptions').split(',')).includes(username);
            ctx.partial("./templates/common/main.hbs");
        });
    });
};

handlers.follow = function (ctx) {
    let subs = sessionStorage.getItem('subscriptions').split(',') || [];
    let target = this.params.target.substr(1);

    //requester.update("user", userId, "kinvey", data).then(() => {
    //    this.redirect("#/profile")
    //}).catch(notifications.handleError);
};

handlers.unfollow = function (ctx) {
    let subs = sessionStorage.getItem('subscriptions').split(',') || [];
    let userId = sessionStorage.getItem('userId');
    let target = this.params.target.substr(1);
    let data = {"subscriptions": subs.filter(u => u !== target)};


    console.log(data);

    //requester.update("user", userId, "kinvey", subscriptions).then(() => {
    //    console.log(subscriptions);
    //    sessionStorage.setItem('subscriptions', subscriptions);
    //    this.redirect(`#/profile/:${userId}`)
    //}).catch(notifications.handleError);
};