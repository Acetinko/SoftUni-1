function attachEvents() {
    const url = "https://messenger-c3f7e.firebaseio.com/";
    $("#submit").on("click", submit);
    $("#refresh").on("click", refresh);

    function refresh() {
        $.get(url + ".json").then(displayMessage);
    }

    function displayMessage(data) {
        let messages = $("#messages");
        messages.empty();

        let outMessages = [];
        for (let id in data) {
            outMessages.push(`${data[id].author}: ${data[id].content}`);
        }

        messages.text(`${outMessages.join('\n')}`);
    }

    function submit() {
        let author = $("#author");
        let content = $("#content");

        if (author.val() !== '') {
            let newMessageJSON = JSON.stringify({
                author: author.val(),
                content: content.val() === '' ? "not again" : content.val(),
                timestamp: Date.now()
            });

            author.val('');
            content.val('');
            $.post(url + '.json', newMessageJSON).then(refresh);
        }
    }
}