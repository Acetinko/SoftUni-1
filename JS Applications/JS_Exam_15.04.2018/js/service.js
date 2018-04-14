let service = {

    getChipsFromSubs: function (filter) {
        let subs = sessionStorage.getItem('subscriptions').split(',');
        subs = subs.map(e => `"${e}"`);
        let endpoint = `chirps?query={"author":{"$in": [${subs}]}}&sort={"_kmd.ect": -1}`;
        return requester.get('appdata', endpoint);
    },

    getChipsByUser: function (username) {
        if (!username) {
            username = sessionStorage.getItem("username");
        }

        let endpoint = `chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`;
        return requester.get("appdata", endpoint, "kinvey");
    },

    getFollow: function(userId){

    },


    getUserById: function(userId){
        let endpoint = `?query={"_id":"${userId}"}`;
        return requester.get("user", endpoint, "kinvey");
    },

    countChirps: function (username) {
        return new Promise((resolve, reject) => {
            let endpoint = `chirps?query={"author":"${username}"}`;
            requester.get("appdata", endpoint, "kinvey").then(chirps => {
                resolve(chirps.length);
            }).catch(reject);
        });
    },

    countFollowing: function (username) {
        if (username === sessionStorage.getItem('username')) {
            return new Promise((resolve, reject) => {
                resolve(JSON.parse(sessionStorage.getItem('subscriptions').length));
            });
        } else {
            return new Promise((resolve, reject) => {
                let endpoint = `?query={"username":"${username}"}`;
                requester.get("user", endpoint, "kinvey").then(users => {
                    if (!users[0].subscriptions) {
                        resolve(0);
                    }
                    resolve(users[0].subscriptions.length);
                }).catch(reject);
            });
        }
    },

    countFollowers: function (username) {
        return new Promise((resolve, reject) => {
            let endpoint = `?query={"subscriptions":"${username}"}`;
            requester.get("user", endpoint, "kinvey").then((followers) => {
                resolve(followers.length);
            }).catch(reject);
        });
    },

    getStats: function (username) {
        let chirps = service.countChirps(username);
        let following = service.countFollowing(username);
        let followers = service.countFollowers(username);

        return Promise.all([chirps, following, followers]);
    },


};