function startApp() {
    const DATABASE_NAME = "prodavachnik";
    const TEMPLATES = {};

    $('header').find('a').show();

    home();

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

    async function home() {
        showView('home');
        await loadTemplates();
        await viewLogin();
        await viewRegister();
        eventListeners();
    }

    async function loadTemplates() {
        const [loginRegisterTemplate, adsCatalogTemplates, adTableTemplates] =
            await Promise.all([
            $.get("./templates/login-register.html"),
            $.get("./templates/ads-catalog.html"),
            $.get("./templates/ad-table-partial.html")
        ]);

        TEMPLATES["loginOrRegister"] = Handlebars.compile(loginRegisterTemplate);
        TEMPLATES["catalog"] = Handlebars.compile(adsCatalogTemplates);
        Handlebars.registerPartial("adTable", adTableTemplates);
    }

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

        $('body').on("click", () => {
            let ev = $(event.target);
            if (ev.attr("id") === "deleteBtn") {
                deleteAd(ev.parent().parent().attr("dataid"));
            } else if (ev.attr("id") === "editBtn") {
                openEditAd(ev.parent().parent());
            }
        });
    }

    async function register() {
        let usernameInput = $('#formRegister input[name="username"]');
        let passwdInput = $('#formRegister input[name="passwd"]');

        if (usernameInput.val().trim().length === 0 || passwdInput.val().trim().length === 0) {
            return;
        }

        try {
            let username = usernameInput.val().trim();
            let password = passwdInput.val().trim();

            let res = await requester.post('user', '', {username, password}, 'basic');
            showInfo('Registered');
            saveSession(res);
            showView('ads');

            usernameInput.val('');
            passwdInput.val('');
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

    async function viewLogin() {
        let context = {
            titleFormName: "Please login",
            idFormType: "formLogin",
            buttonUserId: "buttonLoginUser",
            nameBtn: "Login"
        };

        let html = TEMPLATES["loginOrRegister"](context);
        $('#viewLogin').html(html);
    }

    async function viewRegister() {
        let context = {
            titleFormName: "Please register here",
            idFormType: "formRegister",
            buttonUserId: "buttonRegisterUser",
            nameBtn: "Register"
        };
        let html = TEMPLATES["loginOrRegister"](context);
        $('#viewRegister').html(html);
    }

    async function login() {
        console.log("FSDF");

        let username = $('#formLogin input[name="username"]').val();
        let password = $('#formLogin input[name="passwd"]').val();
        console.log(username);
        console.log(password);

        try {
            let res = await requester.post('user', 'login', {username, password}, 'basic');
            showInfo('Logged in');
            saveSession(res);
            showView('ads');
        } catch (err) {
            handleError(err);
        }
    }

    async function loadDivAds() {
        let content = $("#content");
        content.empty();
        let ads = await requester.get('appdata', DATABASE_NAME);

        let hasActions = false;
        for (let ad of ads) {
            if (ad._acl.creator === sessionStorage.getItem("id")) {
                ad.isAuthor = true;
                hasActions = true;
            }
        }

        let context = {
            ads,
            hasActions
        };

        let html = TEMPLATES["catalog"](context);
        content.html(html);
    }

    async function deleteAd(id) {
        await requester.remove('appdata', DATABASE_NAME + '/' + id);
        showInfo('Ad deleted');
        showView('ads');
    }

    async function openEditAd(adTemplate) {
        let tokens = $(adTemplate).find("td").toArray();
        let ad = {
            _id: adTemplate.attr("dataid"),
            title: tokens[0].textContent,
            publisher: tokens[1].textContent,
            description: tokens[2].textContent,
            price: tokens[3].textContent,
            date: tokens[4].textContent
        };

        console.log(ad);
        console.log(Number(ad.price));

        let form = $('#formEditAd');
        form.find('input[name="title"]').val(ad.title);
        form.find('textarea[name="description"]').val(ad.description);
        form.find('input[name="price"]').val(Number(ad.price));
        //form.find('input[name="image"]').val(ad.imageUrl);

        form.find('input[name="id"]').val(ad._id);
        form.find('input[name="publisher"]').val(ad.publisher);
        form.find('input[name="datePublished"]').val(ad.date);

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
        let date = form.find('input[name="datePublished"]').val();

        if (title.length === 0) {
            showError('Title cannot be empty');
            return;
        }
        if (description.length === 0) {
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
        if (description.length === 0) {
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