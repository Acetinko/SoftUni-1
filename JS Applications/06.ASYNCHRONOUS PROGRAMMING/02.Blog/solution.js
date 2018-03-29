function attachEvents() {
    const appId = "kid_B15S6I9Zl";
    const url = "https://baas.kinvey.com/appdata/" + appId;
    const username = "peter";
    const password = "p";
    const base64auth = btoa(username + ":" + password);
    const authHeaders = {"Authorization": "Basic " + base64auth};

    $("#btnLoadPosts").click(loadPostsClick);
    $("#btnViewPost").click(viewPostClick);

    function loadPostsClick() {
        let loadPostsRequest = {
            url: url + "/posts",
            headers: authHeaders,
        };
        $.ajax(loadPostsRequest)
            .then(displayPosts)
            .catch(displayError);
    }

    function displayPosts(posts) {
        $("#posts").empty();

        for (let post of posts) {
            let option = $("<option>")
                .text(post.title)
                .val(post._id);
            $("#posts").append(option);
        }
    }

    function viewPostClick() {
        let selectedPostId = $("#posts").val();
        if (!selectedPostId) {
            return
        }

        let requestPosts = $.ajax({
            url: url + "/posts/" + selectedPostId,
            headers: authHeaders
        });
        let requestComments = $.ajax({
            url: url + `/comments/?query={"post_id":"${selectedPostId}"}`,
            headers: authHeaders
        });
        Promise.all([requestPosts, requestComments])
            .then(displayPostWithComments)
            .catch(displayError);
    }

    function displayPostWithComments([post, comments]) {
        $("#post-title").text(post.title);
        $("#post-body").text(post.body);
        $("#post-comments").empty();
        for (let comment of comments) {
            let commentItem = $("<li>")
                .text(comment.text);
            $("#post-comments")
                .append(commentItem);
        }
    }

    function displayError(err) {
        let errorDiv = $("<div>").text("Error: " +
            err.status + ' (' + err.statusText + ')');
        $(document.body).prepend(errorDiv);
        setTimeout(function () {
            $(errorDiv).fadeOut(function () {
                $(errorDiv).remove();
            });
        }, 3000);
    }
}