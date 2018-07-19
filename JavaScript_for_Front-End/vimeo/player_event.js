(() => {
    $(".video").on("click", function (ev) {
        searchTypeVideoPlayer();
    });

    function searchTypeVideoPlayer() {
        new Promise(function (resolve, reject) {
            setTimeout(function () {
                addVideoPlayer(resolve);
            }, 10000);
        }).then(function (res) {
            console.log(res);
            r = {message: "Error in function 'searchTypeVideoPlayer'", description: res};
        });
    }

    function addVideoPlayer(resolve) {
        isSearchUrlVimeo = false;
        isSearchUrlYoutube = false;
        iframe = undefined;

        searchUrlVimeo();

        if (isSearchUrlVimeo) {
            player = new Vimeo.Player(iframe);
            resolve(player);
            addVimeoPlayer();
        }

        if (isSearchUrlYoutube) {
            //TODO

            console.log("YOUTUBE");
            console.log(iframe[1].src);
            console.log(iframe[0]);
            //vl = document.getElementsByClassName('html5-video-player paused-mode ytp-expand-pause-overlay ytp-large-width-mode');
            console.log(iframe[2]);
            console.log(iframe[3]);
            console.log(document.getElementsByClassName('video-stream'));
        }
    }

    function searchUrlVimeo() {
        iframeAll = document.querySelectorAll('iframe');
        yt = document.getElementsByClassName('video-stream');

        for (i = 0; i < iframeAll.length; i++) {
            srcArr = (iframeAll[i].src).split("/");

            countElementUrlVimeo = 0;
            for (j = 0; j < srcArr.length; j++) {
                countElementUrlVimeo += srcArr[j] === "https:" ||
                srcArr[j] === "player.vimeo.com" ||
                srcArr[j] === "video" ? 1 : 0;
            }

            if (countElementUrlVimeo === 3) {
                iframe = iframeAll[i];
                isSearchUrlVimeo = true;
                break;
            }

            youtubeId = 0;
            countElementUrlYoutube = 0;
            for (j = 0; j < srcArr.length; j++) {
                countElementUrlYoutube += srcArr[j] === "https:" ||
                srcArr[j] === "www.youtube.com" ||
                srcArr[j] === "youtube.com" ||
                srcArr[j] === "embed" ? 1 : 0;
                youtubeIdAndOther = srcArr[j].split('?');
                youtubeId = youtubeIdAndOther[0].length === 11 ? youtubeIdAndOther[0] : 0;
            }

            if (countElementUrlYoutube === 3) {
                iframe = [
                    youtubeId,
                    iframeAll[i],
                    $('#player video.video-stream'),
                    yt
                ];
                isSearchUrlYoutube = true;
                break;
            }
        }
    }

    function addVimeoPlayer() {
        addVimeoPlayerEvent();
        exitBtnVimeoVideo();
    }

    function addVimeoPlayerEvent() {
        player.on('play', function (data) {
            jsonStatusVimeo(data, "play");
        });

        player.on('pause', function (data) {
            jsonStatusVimeo(data, "pause");
        });

        player.on('ended', function (data) {
            jsonStatusVimeo(data, "ended");
        });
    }

    function exitBtnVimeoVideo() {

        $(".lity-wrap").on("click", function (ev) {
            timeDuration = player.getDuration().then(function (duration) {
                return duration;
            }).catch(function (err) {
                console.log(err);
            });

            timeSeconds = player.getCurrentTime().then(function (seconds) {
                return seconds;
            }).catch(function (err) {
                console.log(err);
            });

            Promise.all([timeDuration, timeSeconds]).then(function (arr) {
                obj = {
                    seconds: arr[1],
                    percent: parseFloat((arr[1] / arr[0]).toFixed(3)),
                    duration: arr[0]
                };

                jsonStatusVimeo(obj, "currentTime");

                player = undefined;
            }).catch(function (err) {
                console.log(err);
            });
        });
    }

    function jsonStatusVimeo(infoTimes, status) {
        Promise.all([player.getVideoTitle(), player.getVideoId()])
            .then(function (data) {
                infoTimes.percent = parseFloat((infoTimes.percent *= 100).toFixed(2));
                obj = {title: data[0], videoId: data[1], status: status, infoTimes: infoTimes};

                console.log(`name:${obj.title}, video:${obj.videoId}, status:${obj.status}: `);
                console.log(obj.infoTimes);
                //console.log(JSON.stringify(obj));
            });
    }

})();