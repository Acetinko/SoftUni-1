$(() => {
    const app = Sammy('#main', function () {
        this.use("Handlebars", "hbs");

        this.get("index.html", displayHome);
        this.get("#/home", displayHome);
        this.get("#/about", displayAbout);
        this.get("#/register", displayRegister);
        this.get("#/login", displayLogin);

        this.post("#/login", login);
        this.get("#/logout", logout);

        this.post("#/register", registerUser);

        this.get("#/catalog", displayCatalog);

        this.get("#/create", displayCreateTeam);
        this.post("#/create", createTeam);

        this.get("#/catalog/:id", displayCatalogById);

        this.get("#/join/:id", joinTeamById);
        this.get("#/leave", leaveTeam);

        this.get("#/edit/:id", displayEditTeamById);
        this.post("#/edit/:id", editTeamById);

        this.get("#/remove/:id", displayRemoveTeamById);
        this.post("#/remove/:id", removeTeamById);

        function removeTeamById(ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.removeTeam(teamId)
                .then(function () {
                    auth.showInfo(`TEAM DELETED!`);
                    displayCatalog(ctx);
                })
                .catch(auth.hasOwnProperty)
        }

        function displayRemoveTeamById(ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    ctx.teamId = teamId;
                    ctx.name = teamInfo.name;
                    ctx.comment = teamInfo.comment;

                    ctx.loadPartials({
                        header: "./templates/common/header.hbs",
                        footer: "./templates/common/footer.hbs",
                        editForm: "./templates/remove/removeForm.hbs"
                    }).then(function () {
                        this.partial("./templates/remove/removePage.hbs");
                    });
                })
                .catch(auth.handleError);
        }

        function editTeamById(ctx) {
            let teamId = ctx.params.id.substr(1);
            let teamName = ctx.params.name;
            let teamComment = ctx.params.comment;
            
            teamsService.edit(teamId, teamName, teamComment)
                .then(function () {
                    auth.showInfo(`TEAM ${teamName} EDITED!`);
                    displayCatalog(ctx);
                })
                .catch(auth.handleError);
        }

        function displayEditTeamById(ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    ctx.teamId = teamId;
                    ctx.name = teamInfo.name;
                    ctx.comment = teamInfo.comment;

                    ctx.loadPartials({
                        header: "./templates/common/header.hbs",
                        footer: "./templates/common/footer.hbs",
                        editForm: "./templates/edit/editForm.hbs"
                    }).then(function () {
                        this.partial("./templates/edit/editPage.hbs");
                    });
                })
                .catch(auth.handleError);
        }

        function leaveTeam(ctx) {
            teamsService.leaveTeam()
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo("LEAVE THE TEAM");
                    displayCatalog(ctx);
                })
                .catch(auth.handleError);
        }

        function joinTeamById(ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.joinTeam(teamId)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo("JOIN TEAM");
                    displayCatalog(ctx);
                })
                .catch(auth.handleError);
        }

        function displayCatalogById(ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
                    ctx.username = sessionStorage.getItem("username");

                    ctx.name = teamInfo.name;
                    ctx.members = [{username: teamInfo.name}];
                    ctx.comment = teamInfo.comment;

                    ctx.isAuthor = teamInfo._acl.creator === sessionStorage.getItem("userId");
                    ctx.teamId = teamId;
                    ctx.isOnTeam = teamInfo._id === sessionStorage.getItem("teamId");

                    ctx.loadPartials({
                        header: "./templates/common/header.hbs",
                        footer: "./templates/common/footer.hbs",
                        teamMember: "./templates/catalog/teamMember.hbs",
                        teamControls: "./templates/catalog/teamControls.hbs"
                    }).then(function () {
                        this.partial("./templates/catalog/details.hbs");
                    });
                })
                .catch(auth.handleError);
        }

        function createTeam(ctx) {
            let teamName = ctx.params.name;
            let teamComment = ctx.params.comment;

            teamsService.createTeam(teamName, teamComment)
                .then(function (teamInfo) {
                    teamsService.joinTeam(teamInfo._id)
                        .then(function (userInfo) {
                            auth.saveSession(userInfo);
                            auth.showInfo(`TEAM ${teamName} CREATED!`);
                            displayCatalog(ctx);
                        })
                        .catch(auth.handleError);
                })
                .catch(auth.handleError);
        }

        function displayCreateTeam(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                createForm: "./templates/create/createForm.hbs"
            }).then(function () {
                this.partial("./templates/create/createPage.hbs");
            });
        }

        function displayCatalog(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            teamsService.loadTeams()
                .then(function (teams) {
                    ctx.hasNoTeam = sessionStorage.getItem("teamId") === null
                        || sessionStorage.getItem("teamId") === undefined;

                    ctx.teams = teams;

                    ctx.loadPartials({
                        header: "./templates/common/header.hbs",
                        footer: "./templates/common/footer.hbs",
                        team: "./templates/catalog/team.hbs"
                    }).then(function () {
                        this.partial("./templates/catalog/teamCatalog.hbs");
                    });
                })
                .catch(auth.handleError);
        }

        function registerUser(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if (password !== repeatPassword) {
                auth.showError("PASSWORD DO NOT MATCH!")
            } else {
                auth.register(username, password)
                    .then(function (userInfo) {
                        auth.saveSession(userInfo);
                        auth.showInfo("REGISTERED!");
                        displayHome(ctx); //REDIRECT
                    })
                    .catch(auth.handleError);
            }
        }

        function logout(ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("LOGGED OUT!");
                    displayHome(ctx);
                });
        }

        function login(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userInfo) {
                    auth.saveSession(userInfo);
                    auth.showInfo("LOGGED IN!");
                    displayHome(ctx); //REDIRECT
                });
        }

        function displayLogin(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                loginForm: "./templates/login/loginForm.hbs"
            }).then(function () {
                this.partial("./templates/login/loginPage.hbs");
            });
        }

        function displayRegister(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs",
                registerForm: "./templates/register/registerForm.hbs"
            }).then(function () {
                this.partial("./templates/register/registerPage.hbs");
            });
        }

        function displayAbout(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/about/about.hbs");
            });
        }

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");

            ctx.loadPartials({
                header: "./templates/common/header.hbs",
                footer: "./templates/common/footer.hbs"
            }).then(function () {
                this.partial("./templates/home/home.hbs");
            });
        }

    });

    app.run();
});