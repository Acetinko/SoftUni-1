$(() => {

    showView("AppHome");

    // Attach event handler
    (() => {
        $("#app").find("a[data-target]").click(navigateTo);
        //$("#viewUserHome").find("a[data-target]").click(navigateTo);
        //$("header").find("a[data-target]").click(navigateTo);
        $("#formRegister").submit(registerUser);
        $("#formLogin").submit(loginUser);
        $("#linkMenuLogout").click(logoutUser);
        $("#formSendMessage").submit(sendMessage);
        $(".notification").click(function () {
            $(this).hide()
        });
    })();

    if (sessionStorage.getItem("username") === null) {
        userLoggedOut();
    } else {
        userLoggedIn();
    }

    function sendMessage(ev) {
        ev.preventDefault();
        let senderUsername = sessionStorage.getItem("username");
        let senderName = sessionStorage.getItem("name");
        let recipientUsername = $("#msgRecipientUsername").val();
        let textInput = $("#msgText");
        let text = textInput.val().trim();

        messagesService.sendMessage(senderUsername, senderName, recipientUsername, text)
            .then(() => {
                showInfo("Message sent.");
                showView("ArchiveSent");
                loadArchiveMessages();

                textInput.val('');
            })
            .catch();
    }

    function loadSendMessage() {
        $("#msgRecipientUsername").empty();

        messagesService.loadAllUsers()
            .then((allUser) => {
                displayAllUsers(allUser);
            })
            .catch(handleError);
    }

    function displayAllUsers(allUser) {
        let msgRecipientUsername = $("#msgRecipientUsername");

        for (let user of allUser) {
            let username = user.username;
            let fullName = formatSender(user.name, username);

            if (username !== sessionStorage.getItem("username")) {
                msgRecipientUsername
                    .append($(`<option value="${username}">${fullName}</option>`));
            }
        }
    }

    function loadArchiveMessages() {
        $("#sentMessages").empty();
        let username = sessionStorage.getItem("username");

        messagesService.loadArchiveMessages(username)
            .then((myMessages) => {
                displayArchiveMessages(myMessages);
            })
            .catch(handleError);
    }

    function displayArchiveMessages(myMessages) {
        let messagesContainer = $("#sentMessages");

        let table = $("<table>");
        const THEAD = $("<thead>\n" +
            "                    <tr>\n" +
            "                        <th>To</th>\n" +
            "                        <th>Message</th>\n" +
            "                        <th>Date Sent</th>\n" +
            "                        <th>Actions</th>\n" +
            "                    </tr>\n" +
            "                    </thead>");

        let tableBody = $("<tbody>");

        for (let msg of myMessages) {
            let tableRow = $('<tr>');

            let sender = msg['recipient_username'];
            let msgText = msg['text'];
            let msgDate = formatDate(msg['_kmd']['lmt']);

            tableRow.append($("<td>").text(sender));
            tableRow.append($("<td>").text(msgText));
            tableRow.append($("<td>").text(msgDate));
            tableRow.append($("<td>")
                .append($(`<button value="${msg._id}">Delete</button>`)
                    .click(deleteMessage))
            );

            tableBody.append(tableRow);
        }

        table.append(THEAD);
        table.append(tableBody);
        messagesContainer.append(table);
    }

    function deleteMessage(ev) {
        let messageId = ev.target.value;

        messagesService.deleteMessage(messageId)
            .then(() => {
                showInfo("Message deleted.");
                loadArchiveMessages();
            })
            .catch(handleError);
    }

    function loadReceivedMessages() {
        $("#myMessages").empty();
        let username = sessionStorage.getItem("username");

        messagesService.loadRecipientMessages(username)
            .then((myMessages) => {
                displayReceivedMessages(myMessages);
            })
            .catch(handleError);
    }

    function displayReceivedMessages(myMessages) {
        let messagesContainer = $("#myMessages");

        let table = $("<table>");
        const THEAD = $("<thead>\n" +
            "                        <tr>\n" +
            "                            <th>From</th>\n" +
            "                            <th>Message</th>\n" +
            "                            <th>Date Received</th>\n" +
            "                        </tr>\n" +
            "                    </thead>");

        let tableBody = $("<tbody>");

        for (let msg of myMessages) {
            let tableRow = $('<tr>');

            let sender = formatSender(msg['sender_name'], msg['sender_username']);
            let msgText = msg['text'];
            let msgDate = formatDate(msg['_kmd']['lmt']);

            tableRow.append($("<td>").text(sender));
            tableRow.append($("<td>").text(msgText));
            tableRow.append($("<td>").text(msgDate));

            tableBody.append(tableRow);
        }

        table.append(THEAD);
        table.append(tableBody);
        messagesContainer.append(table);
    }

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

    function formatSender(name, username) {
        if (!name)
            return username;
        else
            return username + ' (' + name + ')';
    }

    function logoutUser(ev) {
        auth.logout()
            .then(() => {
                sessionStorage.clear();
                showInfo("Logout successful.");
                userLoggedOut();
            })
            .catch(handleError);
    }

    function loginUser(ev) {
        ev.preventDefault();
        let loginUsername = $("#loginUsername");
        let loginPasswd = $("#loginPasswd");

        let username = loginUsername.val().trim();
        let password = loginPasswd.val().trim();
        auth.login(username, password)
            .then((userInfo) => {
                saveSession(userInfo);
                showInfo("Login successful.");

                loginUsername.val('');
                loginPasswd.val('');
            })
            .catch(handleError);
    }

    function registerUser(ev) {
        ev.preventDefault();
        let registerUsername = $("#registerUsername");
        let registerPasswd = $("#registerPasswd");
        let registerName = $("#registerName");

        let username = registerUsername.val().trim();
        let name = registerName.val().trim();
        let password = registerPasswd.val().trim();

        auth.register(username, password, name)
            .then((userInfo) => {
                saveSession(userInfo);
                showInfo("User registration successful");

                registerUsername.val('');
                registerName.val('');
                registerPasswd.val('');
            })
            .catch(handleError);
    }

    function navigateTo() {
        let viewName = $(this).attr("data-target");

        switch (viewName) {
            case "MyMessages":
                loadReceivedMessages();
                break;
            case "ArchiveSent":
                loadArchiveMessages();
                break;
            case "SendMessage":
                loadSendMessage();
                break;
        }

        showView(viewName);
    }

    function showView(viewName) {
        $("main > section").hide();
        $("#view" + viewName).show();
    }

    function userLoggedIn() {
        $(".anonymous").hide();
        $(".useronly").show();
        let username = sessionStorage.getItem("username");
        $("#spanMenuLoggedInUser").text("Welcome, " + username + '!');
        $("#viewUserHomeHeading").text("Welcome, " + username + '!');
        showView("UserHome");

    }

    function userLoggedOut() {
        $(".anonymous").show();
        $(".useronly").hide();
        $("#spanMenuLoggedInUser").text('');
        showView("AppHome");
    }


    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', userInfo.name);
        sessionStorage.setItem('teamId', userInfo.teamId);
        userLoggedIn();
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    //Handle notifications
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $("#loadingBox").fadeOut()
    });

});