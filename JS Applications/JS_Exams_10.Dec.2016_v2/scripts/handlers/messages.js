handlers.myMessages = function (ctx) {
    let username = sessionStorage.getItem("username");
    this.username = username;
    let endpoint = `messages?query={"recipient_username":"${username}"}`;

    let content = {
        header: "./templates/common/header.hbs",
        footer: "./templates/common/footer.hbs",
        notification: "./templates/common/notifications.hbs",
        page: "./templates/myMessages.hbs",
        message: "./templates/common/message.hbs"
    };

    ctx.loadPartials(content).then(function () {
        ctx.partials = this.partials;
        ctx.partial("./templates/common/main.hbs").then(() => {
            requester.get("appdata", endpoint).then((messages) => {

                messages.forEach(m => m.timestamp = formatDate(m._kmd.lmt));
                ctx.messages = messages;

                ctx.render("./templates/common/displayMyMessages.hbs").then(function () {
                    this.replace("#myMessages");
                });
            }).catch(notifications.handleError);
        });
    });
};

handlers.sendMessageDisplay = function (ctx) {
    this.username = sessionStorage.getItem("username");

    requester.get("user", '').then((allUsers) => {
        ctx.allUsers = allUsers;

        let content = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            notification: "./templates/common/notifications.hbs",
            page: "./templates/sendMessage.hbs"
        };

        ctx.loadPartials(content).then(function () {
            ctx.partials = this.partials;
            ctx.partial("./templates/common/main.hbs");
        });
    }).catch(notifications.handleError);
};

handlers.sendMessageAction = function (ctx) {

    let message = {
        sender_username: sessionStorage.getItem("username"),
        sender_name: sessionStorage.getItem("name"),
        recipient_username: this.params.recipient,
        text: this.params.text
    };

    requester.post("appdata", "messages", '', message).then((res) => {
        notifications.showInfo("Message sent.");
        setTimeout(() => ctx.redirect("#/archive"), 200);
        //ctx.redirect("#/archive");
    }).catch(notifications.handleError);
};

handlers.archiveDisplay = function (ctx) {
    let username = sessionStorage.getItem("username");
    this.username = username;
    let endpoint = `messages?query={"sender_username":"${username}"}`;

    requester.get("appdata", endpoint, 'kinvey').then((archiveList) => {
        archiveList.forEach(m => m.timestamp = formatDate(m._kmd.lmt));
        ctx.archiveList = archiveList;

        let context = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            notification: "./templates/common/notifications.hbs",
            page: "./templates/archiveSent.hbs"
        };

        this.loadPartials(context).then(function () {
            ctx.partials = this.partials;

            this.partial("./templates/common/main.hbs").then(() => {
                $("button").click((ev) => {
                    let id = $(ev.target).attr("data-id");

                    requester.remove("appdata", `messages/${id}`).then(() => {

                        notifications.showInfo("Message deleted!");
                        $(ev.target).parent().parent().remove();
                        //ctx.redirect("#/archive");
                    }).catch(notifications.handleError);
                });
            });
        });
    }).catch(notifications.handleError);
};

function formatDate(dateISO8601) {
    let date = new Date(dateISO8601);
    if (Number.isNaN(date.getDate()))
        return '';
    return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
        "." + date.getFullYear() + ' ' + date.getHours() + ':' +
        padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

    function padZeros(num) {
        return ('0' + num).slice(-2);
    }
}
