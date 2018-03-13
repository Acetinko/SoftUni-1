class TitleBar {
    constructor(title) {
        this.title = title;
        this.links = [];
    }

    addLink(href, name) {
        let link = $('<a>')
            .addClass("menu-link")
            .attr("href", href)
            .text(name);
        this.links.push(link);
    }

    appendTo(selector) {
        let header = $("<header>").addClass("header");
        let headerRow = $("<div>").addClass("header-row");
        let button = $("<a>").addClass("button").html("&#9776;")
            .on("click", function () {
                $("div.drawer").toggle()
            });
        let span = $("<title>").addClass("title").text(this.title);
        let divDrawer = $("<div>").addClass("drawer");
        let nav = $("<nav>").addClass("menu");

        //Appending elements
        this.links.forEach(link => nav.append(link));
        divDrawer.append(nav);
        headerRow.append(button);
        headerRow.append(span);
        header.append(headerRow);
        header.append(divDrawer);

        $(selector).append(header);
    }

}