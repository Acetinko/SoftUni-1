const notifications = {};

$(() => {
    // Notifications
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $("#loadingBox").fadeOut()
    });

    notifications.showInfo = function (message) {
        let infoBox = $('#infoBox');
        infoBox.click((event) => $(event.target).hide());
        infoBox.find("span").text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    };

    notifications.showError = function (message) {
        let errorBox = $('#errorBox');
        errorBox.click((event) => $(event.target).hide());
        errorBox.find("span").text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    };

    notifications.handleError = function (reason) {
        notifications.showError(reason.responseJSON.description);
    };
});