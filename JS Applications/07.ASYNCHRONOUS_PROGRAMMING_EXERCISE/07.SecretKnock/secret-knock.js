function secretKnock() {
    const serviceUrl = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock?query=";
    const username = "guest";
    const password = "guest";
    //let base64Auth = new Buffer(kinveyUsername + ":" + kinveyPassword).toString('base64');
    const base64Auth = btoa(username + ":" + password);
    const authHeaders = {"Authorization":"Basic " + base64Auth};

    let currentMessage = "Knock Knock.";
    console.log(currentMessage);
    $("body").append(currentMessage).append($("<br>"));
    getNext(currentMessage);

    function getNext(message) {
        let request = {
            url: serviceUrl + message,
            method: "GET",
            headers: authHeaders
        };

        $.ajax(request)
            .then(function (object) {
                if(object.answer){
                    console.log(object.answer);
                    $("body").append(object.answer).append($("<br>"));
                }
                if(object.message){
                    console.log(object.message);
                    $("body").append(object.message).append($("<br>"));
                    currentMessage = object.message;
                    getNext(currentMessage);
                }
            });
    }
}