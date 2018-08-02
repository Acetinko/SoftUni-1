function startApp() {
    const DATABASE_NAME = "prodavachnik";
    const ADS_DIV = $('#ads');

    $('header').find('a').show();
    showView('home');
    if (sessionStorage.getItem('authtoken') !== null && sessionStorage.getItem('username') !== null) {
        userLoggedIn();
    } else {
        userLoggedOut();
    }

    // Notifications
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    eventListeners();

    function eventListeners() {
        $('#linkHome').click(() => showView('home'));
        $('#linkLogin').click(() => showView('login'));
        $('#linkRegister').click(() => showView('register'));
        $('#linkListAds').click(() => showView('ads'));
        $('#linkCreateAd').click(() => showView('create'));
        $('#linkLogout').click(logout);

        $('#buttonLoginUser').click(login);
        $('#buttonRegisterUser').click(register);
        $('#buttonCreateAd').click(createAd);
        $('#buttonEditAd').click(editAd);

        $('#infoBox').click((event) => $(event.target).hide());
        $('#errorBox').click((event) => $(event.target).hide());
    }

    async function register() {
        let username = $('#formLogin input[name="username"]').val();
        let password = $('#formLogin input[name="passwd"]').val();

        try {
            let res = await requester.post('user', '', {username, password}, 'basic');
            showInfo('Registered');
            saveSession(res);
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }

    async function logout() {
        try {
            await requester.post('user', '_logout', {authtoken: sessionStorage.getItem('authtoken')});
            sessionStorage.clear();
            showInfo('Logged out');
            userLoggedOut();
            showView('home');
        } catch (err) {
            handleError(err);
        }
    }

    async function login() {
        let username = $('#formLogin input[name="username"]').val();
        let password = $('#formLogin input[name="passwd"]').val();

        try {
            let res = await requester.post('user', 'login', {username, password}, 'basic');
            showInfo('Logged in');
            saveSession(res);
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }

    function saveSession(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('id', data._id);
        sessionStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn();
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $("#errorBox");
        errorBox.text(message);
        errorBox.show();
    }

    function handleError(err) {
        showError(err.responseJSON.description);
    }

    function showView(view) {
        $('section').hide();
        switch (view) {
            case 'home':
                $('#viewHome').show();
                break;
            case 'login':
                $('#viewLogin').show();
                break;
            case 'register':
                $('#viewRegister').show();
                break;
            case 'ads':
                $('#viewAds').show();
                loadDivAds();
                break;
            case 'create':
                $('#viewCreateAd').show();
                break;
            case 'details':
                $('#viewDetailsAd').show();
                break;
            case 'edit':
                $('#viewEditAd').show();
                break;
        }
    }

    function userLoggedIn() {
        let loggedInUser = $("#loggedInUser");
        loggedInUser.text(`Welcome, ${sessionStorage.getItem('username')}!`);
        loggedInUser.show();
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkLogout').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
    }

    function userLoggedOut() {
        let loggedInUser = $("#loggedInUser");
        loggedInUser.text('');
        loggedInUser.hide();
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkLogout').hide();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
    }

    async function loadDivAds() {
        ADS_DIV.empty();
        let res = await requester.get('appdata', DATABASE_NAME);

        if (res.length === 0) {
            ADS_DIV.append('<p>Database is empty</p>');
            return;
        }

        let table = $("<table>");
        table.append($("<tr>")
            .append($("<th>Title</th>"))
            .append($("<th>Description</th>"))
            .append($("<th>Publisher</th>"))
            .append($("<th>Date Published</th>"))
            .append($("<th>Price</th>"))
        );

        let hasActions = true;
        for (let re of res) {
            let trData = $("<tr>");
            trData.append(`<td>${re.title}</td>`);
            trData.append(`<td>${re.description}</td>`);
            trData.append(`<td>${re.publisher}</td>`);
            trData.append(`<td>${re.date}</td>`);
            trData.append(`<td>${Number(re.price).toFixed(2)}</td>`);

            if (re._acl.creator === sessionStorage.getItem('id')) {
                hasActions ? $(table.find("tr")[0]).append($("<th>Actions</th>")) : '';
                hasActions = false;
                let tdButton = $("<td>");

                let deleteBtn = $('<a href="#">[Delete]</a>').click(() => deleteAd(re._id));
                deleteBtn.addClass('ad-control');
                deleteBtn.appendTo(tdButton);

                let editBtn = $('<a href="#">[Edit]</a>').click(() => openEditAd(re));
                editBtn.addClass('ad-control');
                editBtn.appendTo(tdButton);

                trData.append(tdButton);
            }
            table.append(trData);
        }
        ADS_DIV.append(table);
    }

    async function deleteAd(id) {
        await requester.remove('appdata', DATABASE_NAME + '/' + id);
        showInfo('Ad deleted');
        showView('ads');
    }

    async function openEditAd(ad) {
        let form = $('#formEditAd');
        form.find('input[name="title"]').val(ad.title);
        form.find('textarea[name="description"]').val(ad.description);
        form.find('input[name="price"]').val(Number(ad.price));
        form.find('input[name="image"]').val(ad.imageUrl);

        form.find('input[name="id"]').val(ad._id);
        form.find('input[name="publisher"]').val(ad.publisher);
        form.find('input[name="date"]').val(ad.date);

        showView('edit');
    }

    async function editAd() {
        let form = $('#formEditAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = form.find('input[name="price"]').val();
        let imageUrl = form.find('input[name="image"]').val();
        let id = form.find('input[name="id"]').val();
        let publisher = form.find('input[name="publisher"]').val();
        let date = form.find('input[name="date"]').val();

        if (title.length === 0) {
            showError('Title cannot be empty');
            return;
        }
        if (description.length === 0){
            showError('Description cannot be empty');
            return;
        }
        if (Number.isNaN(price)) {
            showError('Price cannot be empty');
            return;
        }

        let editedAd = {
            title, description, price, imageUrl, date, publisher
        };

        try {
            await requester.update('appdata', DATABASE_NAME + '/' + id, editedAd);
            showInfo('Ad editted');
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }

    async function createAd() {
        let form = $('#formCreateAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = Number(form.find('input[name="price"]').val());
        let imageUrl = form.find('input[name="image"]').val();
        let date = form.find('input[name="datePublished"]').val();
        let publisher = sessionStorage.getItem('username');

        if (title.length === 0) {
            showError('Title cannot be empty');
            return;
        }
        if (description.length === 0){
            showError('Description cannot be empty');
            return;
        }
        if (Number.isNaN(price)) {
            showError('Price cannot be empty');
            return;
        }
        if (date === '') {
            let now = new Date();
            date = now.getUTCFullYear() + '-' + ('0' + now.getUTCMonth()).slice(-2) +
                '-' + ('0' + now.getUTCDate()).slice(-2);
        }

        let newAd = {title, description, price, imageUrl, date, publisher};

        try {
            await requester.post('appdata', DATABASE_NAME, newAd,);
            showInfo('Ad created');
            showView('ads');

            form.find('input[name="title"]').val('');
            form.find('textarea[name="description"]').val('');
            form.find('input[name="price"]').val('');
            form.find('input[name="image"]').val('');
            form.find('input[name="datePublished"]').val('');

        } catch (err) {
            handleError(err);
        }
    }

    let requester = (() => {
        const BASE_URL = 'https://baas.kinvey.com/';
        const APP_KEY = 'kid_rkM9PKTFG';
        const APP_SECRET = '5b3b7dbbf5dd461b94d1f455a04452da';

        function makeAuth(type) {
            if (type === 'basic') {
                return 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET);
            }
            else {
                return 'Kinvey ' + sessionStorage.getItem('authtoken');
            }
        }

        function makeRequest(method, module, url, auth) {
            return req = {
                url: BASE_URL + module + '/' + APP_KEY + '/' + url,
                method: method,
                headers: {'Authorization': makeAuth(auth)}
            };
        }

        function get(module, url, auth) {
            return $.ajax(makeRequest('GET', module, url, auth));
        }

        function post(module, url, data, auth) {
            let req = makeRequest('POST', module, url, auth);
            req.data = JSON.stringify(data);
            req.headers['Content-Type'] = 'application/json';
            return $.ajax(req);
        }

        function update(module, url, data, auth) {
            let req = makeRequest('PUT', module, url, auth);
            req.data = JSON.stringify(data);
            req.headers['Content-Type'] = 'application/json';
            return $.ajax(req);
        }

        function remove(module, url, auth) {
            return $.ajax(makeRequest('DELETE', module, url, auth));
        }

        return {
            get, post, update, remove
        }
    })();
}