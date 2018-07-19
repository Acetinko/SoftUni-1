console.log("1");

player;
let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        iframe = document.querySelectorAll('iframe');
        iframe = iframe[3];
        player = new Vimeo.Player(iframe);
        resolve(player);
    }, 1000)
}).then(function (res) {
    console.log(res);
});

p.then(function (result) {}).catch(function (error) {
    console.log(error);
});

console.log("2");

player;

$(".video").on("click", function(ev){
    new Promise(function (resolve, reject) {
        setTimeout(function () {
            iframe = document.querySelectorAll('iframe');
            iframe = iframe[3];
            player = new Vimeo.Player(iframe);
            resolve(player);
        }, 3000)
    }).then(function (res) {
        console.log(res);
    });
});



play = new Promise(function (resolve, reject) {
    player.on('play', function(data) {
        //console.log("play: " + data["seconds"]);
        //console.log(data);
        resolve(data);
    });
}).catch(function (err) {
    return err;
});

pause = new Promise(function (resolve, reject) {
    player.on('pause', function (data) {
        //console.log("pause: " + data["seconds"]);
        //console.log(data);
        resolve(data);
    });
}).catch(function (err) {
    return err;
});

ended = new Promise(function (resolve, reject) {
    player.on('ended', function(data) {
        //console.log("end: " + data["seconds"]);
        //console.log(data);
        resolve(data);
    });
}).catch(function (err) {
    return err;
});

Promise.all([p1, pause, play, ended])
    .then(function (res) {
        return res.join(',');

    }).catch(function (err) {
    return err;
});


function searchVimeoVideo() {
    //player = undefined;
    iframeAll = document.querySelectorAll('iframe');
    for (i = 0; i < iframeAll.length; i++) {
        srcArr = (iframeAll[i].src).split("/");
        count = 0;
        for (j = 0; j < srcArr.length; j++) {
            count += srcArr[j] === "https:" ||
            srcArr[j] === "player.vimeo.com" ||
            srcArr[j] === "video" ? 1 : 0;
        }

        if (count === 3) {
            iframe = iframeAll[i];
            break;
        }
    }

    iframe = iframe[3];
    player = new Vimeo.Player(iframe);
    console.log(player);
}
