handlers.home = function (ctx) {
    if (auth.isAuth() === false) {
        this.redirect("#/welcome");
        return;
    }

    let userId = sessionStorage.getItem("userId");
    this.username = sessionStorage.getItem("username");
    this.isAuth = auth.isAuth();

    let endpoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`;
    requester.get("appdata", endpoint, "kinvey").then(function (receipt) {

        if (receipt.length > 0) {
            let receiptId = receipt[0]._id;

            endpoint = `entries?query={"receiptId":"${receiptId}"}`;
            requester.get("appdata", endpoint, "kinvey").then(function (entries) {

                let subTotal = 0;
                for (let entry of entries) {
                    let total = (+entry.qty * +entry.price).toFixed(2);
                    entry.total = total;
                    subTotal += +total;
                    entry.price = (+entry.price).toFixed(2);
                }

                ctx.entries = entries;
                ctx.subTotal = subTotal.toFixed(2);
                ctx.receiptId = receiptId;

                let content = {
                    header: "./templates/common/header.hbs",
                    footer: "./templates/common/footer.hbs",
                    page: "./templates/create-receipt.hbs"
                };
                ctx.loadPartials(content).then(function () {

                    ctx.partials = this.partials;
                    ctx.partial("./templates/common/main.hbs");
                });
            }).catch(notifications.handleError);
        } else {
            let data = {
                active: true,
                productCount: 0,
                total: 0
            };

            requester.post("appdata", "receipts", "kinvey", data).then(function () {
                ctx.redirect("#/home");
            }).catch(notifications.handleError);
        }
    }).catch(notifications.handleError);
};

handlers.addEntry = function (ctx) {
    if (auth.isAuth() === false) {
        this.redirect("#/welcome");
        return;
    }

    let receiptId = this.params.id.substr(1);
    let type = this.params.type;
    let qty = this.params.qty;
    let price = +(this.params.price);

    if (type.trim() === '') {
        notifications.showError("Product name must be a non-empty string.");
        return;
    }

    if (!(/^[\d/.]+$/g).test(qty)) {
        notifications.showError("Quantity must be a number.");
        return;
    }

    if (!(/^[\d/.]+$/g).test(price)) {
        notifications.showError("Price must be a number.");
        return;
    }

    let entry = {
        type: type,
        qty: qty,
        price: price.toFixed(2),
        receiptId: receiptId
    };

    requester.post("appdata", "entries", '', entry).then((res) => {
        notifications.showInfo("Entry added.");
        this.redirect("#/home");
    }).catch(notifications.handleError);
};

handlers.removeEntry = function (ctx) {
    if (auth.isAuth() === false) {
        this.redirect("#/welcome");
        return;
    }

    let entryId = this.params.id.substr(1);
    let endpoint = `entries/${entryId}`;

    requester.remove("appdata", endpoint, "kinvey").then(() => {
        notifications.showInfo("Entry removed.");
        this.redirect("#/home");
    }).catch(notifications.handleError)
};

handlers.checkout = function (ctx) {
    if (auth.isAuth() === false) {
        this.redirect("#/welcome");
        return;
    }

    let receiptId = this.params.id.substr(1);
    this.username = sessionStorage.getItem("username");
    this.isAuth = auth.isAuth();

    let endpoint = `entries?query={"receiptId":"${receiptId}"}`;
    requester.get("appdata", endpoint, "kinvey").then(function (entries) {

        if (entries.length !== 0) {
            let productCount = 0;
            let total = 0;

            for (let entry of entries) {
                productCount++;
                total += +entry.qty * +entry.price;
            }

            let data = {
                active: false,
                productCount: productCount,	// Sum of all products
                total: total.toFixed(2),
                // Other receipt properties
            };

            endpoint = `receipts/${receiptId}`;
            requester.update("appdata", endpoint, "kinvey", data).then(function () {
                ctx.partials = this.partials;
                ctx.redirect("#/editor");
                notifications.showInfo("Receipt checked out.");
            }).catch(notifications.handleError);
        } else {
            notifications.showError("Empty receipt!");
            ctx.partials = this.partials;
            ctx.redirect("#/editor");
        }
    }).catch(notifications.handleError);
};

handlers.allReceipt = function (ctx) {
    if (auth.isAuth() === false) {
        this.redirect("#/welcome");
        return;
    }

    let userId = sessionStorage.getItem("userId");
    this.username = sessionStorage.getItem("username");
    this.isAuth = auth.isAuth();

    let endpoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`;
    requester.get("appdata", endpoint, "kinvey").then(function (receipts) {
        let totalSum = 0;
        for (let receipt of receipts) {
            totalSum += +receipt.total;
            receipt.date = (receipt._kmd.lmt).substr(0, 10) + ' ' + (receipt._kmd.lmt).substr(11, 5);
        }
        ctx.totalSum = totalSum.toFixed(2);
        ctx.receipts = receipts;

        let content = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            page: "./templates/all-receipt-view.hbs"
        };
        ctx.loadPartials(content).then(function () {
            ctx.partials = this.partials;
            ctx.partial("./templates/common/main.hbs");
        });
    }).catch(notifications.handleError);
};

handlers.details = function (ctx) {
    if (auth.isAuth() === false) {
        this.redirect("#/welcome");
        return;
    }

    let receiptId = this.params.id.substr(1);
    this.username = sessionStorage.getItem("username");
    this.isAuth = auth.isAuth();

    let endpoint = `entries?query={"receiptId":"${receiptId}"}`;
    requester.get("appdata", endpoint, "kinvey").then((entries) => {

        entries.forEach(e => e.total = (+e.qty * +e.price).toFixed(2));
        ctx.entries = entries;

        let content = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs",
            page: "./templates/receipt-details-view.hbs"
        };
        ctx.loadPartials(content).then(function () {
            ctx.partials = this.partials;
            ctx.partial("./templates/common/main.hbs");
        });
    }).catch(notifications.handleError);
};