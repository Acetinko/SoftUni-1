const handlers = {};

$(() => {
    const app = Sammy("#container", function () {
        this.use("Handlebars", "hbs");

        this.get("index.html", handlers.home);

        this.post("#/login", handlers.loginAction);
        this.post("#/register", handlers.registerAction);
        this.get("#/logout", handlers.logout);

        this.get("#/catalog", handlers.catalog);

        this.get("#/createPost", handlers.displayCreatePost);
        this.post("#/createPost", handlers.createPostAction);

        this.get("#/editPost/:id", handlers.displayEditPost);
        this.post("#/editPost/:id", handlers.editPostAction);

        this.get("#/deletePost/:id", handlers.deletePostById);

        this.get("#/myPosts", handlers.displayMyPosts);

        this.get("#/comments/:id", handlers.displayComments);
        this.post("#/comment/add/:id", handlers.addComment);
        this.get("#/comment/del/:id", handlers.deleteComment);
    });

    app.run();
});