function attachEvents() {
    const serviceUrl = 'https://baas.kinvey.com/appdata/kid_rkM9PKTFG/biggestCatches';
    const username = "guest";
    const password = "guest";
    const base64Auth = btoa(username + ':' + password);

    $(".load").on("click", loadCatches);
    $(".add").on("click", addCatches);

    function loadCatches() {
        let request = {
            url: serviceUrl,
            method: "GET",
            headers: {"Authorization": "Basic " + base64Auth}
        };

        $.ajax(request)
            .then(displayCatches)
            .catch(displayError);
    }

    function displayCatches(catches) {
        let catchesView = $("#catches");
        catchesView.empty();

        for (let c of catches) {
            catchesView.append($(`<div class="catch" data-id="${c._id}">`)
                .append($('<label>Angler</label>'))
                .append($(`<input type="text" class="angler" value="${c.angler}"/>`))
                .append($(`<label>Weight</label>`))
                .append($(`<input type="number" class="weight" value="${c.weight}"/>`))
                .append($(`<label>Species</label>`))
                .append($(`<input type="text" class="species" value="${c.species}"/>`))
                .append($(`<label>Location</label>`))
                .append($(`<input type="text" class="location" value="${c.location}"/>`))
                .append($(`<label>Bait</label>`))
                .append($(`<input type="text" class="bait" value="${c.bait}"/>`))
                .append($(`<label>Capture Time</label>`))
                .append($(`<input type="number" class="captureTime" value="${c.captureTime}"/>`))
                .append($(`<button class="update">Update</button>`).on("click", updateCatches))
                .append($(`<button class="delete">Delete</button>`).on("click", deleteCatches))
            );
        }
    }

    function addCatches() {
        let inputs = $(this).parent().find("input").toArray();

        for (let input of inputs) {
            if ($(input).val() === '') {
                return;
            }
        }

        let dataJson = JSON.stringify({
            angler: $(inputs[0]).val().trim(),
            weight: parseFloat($(inputs[1]).val()),
            species: $(inputs[2]).val().trim(),
            location: $(inputs[3]).val().trim(),
            bait: $(inputs[4]).val().trim(),
            captureTime: parseInt($(inputs[5]).val())
        });

        let request = {
            url: serviceUrl,
            method: "POST",
            headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
            data: dataJson
        };

        $.ajax(request)
            .then(loadCatches)
            .catch(displayError);

        for (let input of inputs) {
            $(input).val('');
        }
    }

    function updateCatches() {
        let inputs = $(this).parent().find("input").toArray();
        let currentId = $(this).parent().attr("data-id");

        let dataJson = JSON.stringify({
            angler: $(inputs[0]).val().trim(),
            weight: parseFloat($(inputs[1]).val()),
            species: $(inputs[2]).val().trim(),
            location: $(inputs[3]).val().trim(),
            bait: $(inputs[4]).val().trim(),
            captureTime: parseInt($(inputs[5]).val())
        });

        let request = {
            url: `${serviceUrl}/${currentId}`,
            method: "PUT",
            headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
            data: dataJson
        };

        $.ajax(request)
            .then(loadCatches)
            .catch(displayError);

    }

    function deleteCatches() {
        let currentId = $(this).parent().attr("data-id");


        let request = {
            url: `${serviceUrl}/${currentId}`,
            method: "DELETE",
            headers: {"Authorization": "Basic " + base64Auth}
        };

        $.ajax(request)
            .then(loadCatches)
            .catch(displayError);

    }

    function displayError(err) {
        console.log(err);
    }
}