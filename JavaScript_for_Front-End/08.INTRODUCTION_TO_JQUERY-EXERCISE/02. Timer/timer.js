function timer() {
    let cnt = 0;
    let check;
    let isStart = false;

    $("#start-timer").on("click", function () {
        if (!isStart) {
            check = setInterval(function () {
                cnt++;
                $('#hours').text(("0" + Math.trunc(cnt / 3600)).slice(-2));
                $('#minutes').text(("0" + Math.trunc((cnt / 60) % 60)).slice(-2));
                $('#seconds').text(("0" + Math.trunc(cnt % 60)).slice(-2))
            }, 1000);

            isStart = true;
        }
    });

    $("#stop-timer").on("click", function () {
        clearInterval(check);
        isStart = false;
    });
}

