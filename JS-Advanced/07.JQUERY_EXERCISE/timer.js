function timer() {
    let count = 0;
    let isStart = false;
    let myTimer;

    $("#start-timer").on("click", function () {
        if (!isStart) {
            myTimer = setInterval(step, 1000);
            isStart = true;
        }
    });

    $("#stop-timer").on("click", function () {
        clearInterval(myTimer);
        isStart = false;
    });

    function step() {
        count++;
        $('#hours').text(("0" + Math.trunc(count / 3600)).slice(-2));
        $('#minutes').text(("0" + Math.trunc((count / 60) % 60)).slice(-2));
        $('#seconds').text(("0" + Math.trunc(count % 60)).slice(-2))
    }
}