handlers.catalog = function (ctx) {
    this.username = sessionStorage.getItem("username");
    let endpoint = 'posts?query={}&sort={"_kmd.ect": -1}';

    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/catalogLists.hbs"
    };

    ctx.loadPartials(content).then(function () {

        ctx.partials = this.partials;
        ctx.partial("./templates/common/main.hbs").then(() => {
            requester.get("appdata", endpoint).then((catalogLists) => {

                catalogLists.forEach(c => c.daysAgo = calcTime(c._kmd.ect));
                let count = 0;
                catalogLists.forEach(c => c.rank = ++count);

                catalogLists.forEach(c => c.isAuth = c.author == sessionStorage.getItem("username"));
                ctx.catalogLists = catalogLists;

                ctx.render("./templates/common/displayCatalog.hbs").then(function () {
                    this.replace(".posts");
                });
            }).catch(notifications.handleError);
        });
    });
};

handlers.displayCreatePost = function (ctx) {
    this.username = sessionStorage.getItem("username");

    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/submit.hbs"
    };

    ctx.loadPartials(content).then(function () {
        ctx.partials = this.partials;
        ctx.partial("./templates/common/main.hbs");
    });
};

handlers.createPostAction = function (ctx) {
    let obj = this.params;

    if (!(/^http.+/g).test(obj.url) || !(/^http.+/g).test(obj.image)) {
        notifications.showError("Link url should always start with “http”.");
        return;
    }

    let post = {
        author: sessionStorage.getItem("username"),
        title: obj.title,
        description: obj.comment,
        url: obj.url,
        imageUrl: obj.image
    };

    requester.post("appdata", "posts", '', post).then((res) => {
        notifications.showInfo("Post created.");
        ctx.redirect("#/catalog");
    }).catch(notifications.handleError);
};

handlers.displayEditPost = function (ctx) {
    this.username = sessionStorage.getItem("username");
    let postId = ctx.params.id.substr(1);
    let endpoint = `posts/${postId}`;

    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/editPost.hbs"
    };
    requester.get("appdata", endpoint, "kinvey").then((post) => {

        ctx._id = post._id;
        ctx.author = post.author;
        ctx.description = post.description;
        ctx.imageUrl = post.imageUrl;
        ctx.title = post.title;
        ctx.url = post.url;

        ctx.loadPartials(content).then(function () {
            this.partial("./templates/common/main.hbs");
        });
    }).catch(notifications.handleError);
};

handlers.editPostAction = function (ctx) {
    let obj = this.params;
    let postId = ctx.params.id.substr(1);
    let endpoint = `posts/${postId}`;

    if (!(/^http.+/g).test(obj.url) || !(/^http.+/g).test(obj.image)) {
        notifications.showError("Link url should always start with “http”.");
        return;
    }

    let post = {
        author: sessionStorage.getItem("username"),
        title: obj.title,
        description: obj.description === "No description" ? '' : obj.description,
        url: obj.url,
        imageUrl: obj.image
    };

    requester.update("appdata", endpoint, "kinvey", post).then(() => {
        notifications.showInfo(`Post ${obj.title} updated`);
        this.redirect("#/catalog");
    }).catch(notifications.handleError);
};

handlers.deletePostById = function (ctx) {
    let postId = ctx.params.id.substr(1);
    let endpoint = `posts/${postId}`;

    requester.remove("appdata", endpoint, "kinvey").then(() => {
        notifications.showInfo("Post deleted");
        this.redirect("#/catalog");
    }).catch(notifications.handleError);
};

handlers.displayMyPosts = function (ctx) {
    let username = sessionStorage.getItem("username");
    this.username = username;
    let endpoint = `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`;

    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/myPosts.hbs"
    };

    ctx.loadPartials(content).then(function () {

        ctx.partials = this.partials;
        ctx.partial("./templates/common/main.hbs").then(() => {
            requester.get("appdata", endpoint).then((posts) => {

                posts.forEach(c => c.daysAgo = calcTime(c._kmd.ect));
                let count = 0;
                posts.forEach(c => c.rank = ++count);
                ctx.posts = posts;

                this.render("./templates/common/displayPosts.hbs").then(function () {
                    this.replace("#viewMyPosts");
                });
            }).catch(notifications.handleError);
        });
    });
};

handlers.displayComments = function (ctx) {
    this.username = sessionStorage.getItem("username");
    let postId = ctx.params.id.substr(1);
    let endpoint = `posts/${postId}`;

    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        menu: "./templates/common/menu.hbs",
        page: "./templates/comments.hbs"
    };

    requester.get("appdata", endpoint, "kinvey").then((post) => {

        ctx._id = post._id;
        ctx.isAuth = post.author == sessionStorage.getItem("username");
        ctx.author = post.author;
        ctx.description = post.description;
        ctx.imageUrl = post.imageUrl;
        ctx.title = post.title;
        ctx.url = post.url;

        endpoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`;
        requester.get("appdata", endpoint, "kinvey").then((comments) => {

            comments.forEach(c => c.daysAgoComment = calcTime(c._kmd.ect));
            comments.forEach(c => c.isAuth = c.author == sessionStorage.getItem("username"));
            ctx.comments = comments;

            ctx.loadPartials(content).then(function () {
                this.partial("./templates/common/main.hbs");
            });
        }).catch(notifications.handleError);
    }).catch(notifications.handleError);
};

handlers.addComment = function (ctx) {
    let postId = ctx.params.id.substr(1);

    let data = {
        "postId": postId,
        "content": ctx.params.content.trim(),
        "author": sessionStorage.getItem("username")
    };

    requester.post("appdata", "comments", "kinvey", data).then(() => {
        notifications.showInfo("Comment created.");
        this.redirect(`#/comments/:${postId}`);
    }).catch(notifications.handleError);
};

handlers.deleteComment = function (ctx) {
    let commentId = ctx.params.id.substr(1);
    let endpoint = `comments/${commentId}`;

    requester.get("appdata", endpoint, "kinvey").then((comment) => {
        let postId = comment.postId;
        requester.remove("appdata", endpoint, "kinvey").then(() => {
            notifications.showInfo("Comment deleted.");
            this.redirect(`#/comments/:${postId}`);
        }).catch(notifications.handleError);
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
