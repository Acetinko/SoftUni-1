$(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        let cats = window.cats;

        let template = await $("#cat-template").html();
        let compiled = Handlebars.compile(template);
        let rendered = compiled({
            cats: cats
        });

        $('#allCats').html(rendered);

        $('.btn-primary').on("click", () => {
            let showStatus = $(event.target)
                .parent()
                .children("div");

            if (showStatus.css("display") === "none") {
                showStatus.css("display", "block");
            } else if (showStatus.css("display") === "block") {
                showStatus.css("display", "none");
            }
        });
    }
})
