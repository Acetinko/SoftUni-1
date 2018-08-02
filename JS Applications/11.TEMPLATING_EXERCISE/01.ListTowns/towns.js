function attachEvents() {
    $("#btnLoadTowns").on("click", () => renderTowns());

    function renderTowns() {
        let towns = $('#towns').val()
            .split(',')
            .map(e => ({town: e.trim()}))
            .filter(e => e.town.length > 0);

        let template = $('#towns-template').html();
        let compiled = Handlebars.compile(template);
        let rendered = compiled({
            towns: towns
        });

        $('#root').html(rendered);
    }
}