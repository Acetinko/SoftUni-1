function startApp() {
    const databaseName = "prodavachnik";

    $('header').find('a').show();
    const adsDiv = $('#ads')

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
                loadAds();
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

    function navigateTo(e) {
        $('section').hide();
        let target = $(e.target).attr('data-target');
        $('#' + target).show();
    }

    // Attach event listeners
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

    // Notifications
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    $('#infoBox').click((event) => $(event.target).hide());
    $('#errorBox').click((event) => $(event.target).hide());

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(() => $('#infoBox').fadeOut(), 3000);
    }

    function showError(message) {
        $('#errorBox').text(message);
        $('#errorBox').show();
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    let requester = (() => {
        const BASE_URL = 'https://baas.kinvey.com/';
        const APP_KEY = 'kid_rkM9PKTFG';
        const APP_SECRET = '5b3b7dbbf5dd461b94d1f455a04452da';

        function makeAuth(type) {
            if (type === 'basic') return 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET);
            else return 'Kinvey ' + localStorage.getItem('authtoken');
        }

        function makeRequest(method, module, url, auth) {
            return req = {
                url: BASE_URL + module + '/' + APP_KEY + '/' + url,
                method,
                headers: {
                    'Authorization': makeAuth(auth)
                }
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

    if (localStorage.getItem('authtoken') !== null &&
        localStorage.getItem('username') !== null) {
        userLoggedIn();
    } else {
        userLoggedOut();
    }
    showView('home');

    function userLoggedIn() {
        $('#loggedInUser').text(`Welcome, ${localStorage.getItem('username')}!`);
        $('#loggedInUser').show();
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkLogout').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
    }

    function userLoggedOut() {
        $('#loggedInUser').text('');
        $('#loggedInUser').hide();
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkLogout').hide();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
    }

    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn();
    }

    async function login() {
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let data = await requester.post('user', 'login', {username, password}, 'basic');
            showInfo('Logged in');
            saveSession(data);
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }

    async function register() {
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let data = await requester.post('user', '', {username, password}, 'basic');
            showInfo('Registered');
            saveSession(data);
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }

    async function logout() {
        try {
            let data = await requester.post('user', '_logout', {authtoken: localStorage.getItem('authtoken')});
            localStorage.clear();
            showInfo('Logged out');
            userLoggedOut();
            showView('home');
        } catch (err) {
            handleError(err);
        }
    }

    async function loadAds() {
        let data = await requester.get('appdata', 'prodavachnik');
        adsDiv.empty();
        if (data.length === 0) {
            adsDiv.append('<p>No ads in database</p>');
            return;
        }

        let table = $("<table>");
        table.append($("<tr>")
            .append($("<th>Title</th>"))
            .append($("<th>Publisher</th>"))
            .append($("<th>Description</th>"))
            .append($("<th>Price</th>"))
            .append($("<th>Date Published</th>"))
        );

        for (let ad of data) {
            console.log(ad);
            let trData = $("<tr>");
            trData.append(`<td>${ad.title}</td>`);
            trData.append(`<td>${ad.publisher}</td>`);
            trData.append(`<td>${ad.description}</td>`);
            //html.append(`<div><img src="${ad.imageUrl}"></div>`);
            trData.append(`<td>Price: ${Number(ad.price).toFixed(2)}</td>`);
            trData.append(`<td>${ad.date}</td>`);

            if (ad._acl.creator === localStorage.getItem('id')) {
                let tdButton = $("<td>");

                let deleteBtn = $('<a href="#">[Delete]</a>').click(() => deleteAd(ad._id));
                deleteBtn.addClass('ad-control');
                deleteBtn.appendTo(tdButton);

                let editBtn = $('<a href="#">[Edit]</a>').click(() => openEditAd(ad));
                editBtn.addClass('ad-control');
                editBtn.appendTo(tdButton);

                trData.append(tdButton);
            }
            table.append(trData);
        }
        adsDiv.append(table);
    }

    async function deleteAd(id) {
        await requester.remove('appdata', 'prodavachnik/' + id);
        showInfo('Ad deleted');
        showView('ads');
    }

    function openEditAd(ad) {
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
        if (Number.isNaN(price)) {
            showError('Price cannot be empty');
            return;
        }

        let editedAd = {
            title, description, price, imageUrl, date, publisher
        };

        try {
            await requester.update('appdata', 'prodavachnik/' + id, editedAd);
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
        let publisher = localStorage.getItem('username');

        if (title.length === 0) {
            showError('Title cannot be empty');
            return;
        }
        if (Number.isNaN(price)) {
            showError('Price cannot be empty');
            return;
        }

        let newAd = {title, description, price, imageUrl, date, publisher};

        try {
            await requester.post('appdata', databaseName, newAd,);
            showInfo('Ad created');
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }
}