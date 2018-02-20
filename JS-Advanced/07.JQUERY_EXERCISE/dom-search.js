function domSearch(selector, isCaseSensitive) {

    $(selector).append($("<div>").addClass("add-controls")
        .append($("<label>").text("Enter text: ")
            .append($("<input>")))
        .append($("<a>").addClass("button").text("Add").on("click", addItem)));

    $(selector).append($("<div>").addClass("search-controls")
        .append($("<label>").text("Search:")
            .append($("<input>").on("input", searchItems))));

    $(selector).append($("<div>").addClass("result-controls")
        .append($("<ul>").addClass("items-list")));

    function addItem() {
        let text = $(".add-controls label input");
        $(".items-list")
            .append($("<li>")
                .addClass("list-item")
                .append($("<a>")
                    .addClass("button")
                    .text("X")
                    .on("click", removeItem))
                .append($("<strong>")
                    .text(text.val())));
        text.val('');
    }

    function removeItem() {
        $(this).parent().remove();
    }

    function searchItems() {
        let searchValue = $(this).val();
        $(".list-item").each((i, li) => matches(li, searchValue));
    }

    function matches(li, searchValue) {
        let liTemp = $(li);
        liTemp.css("display", "block");

        if (isCaseSensitive && liTemp.children("strong").text().indexOf(searchValue) === -1) {
            $(li).css("display", "none");
        } else if (liTemp.children('strong').text().toLowerCase().indexOf(searchValue.toLowerCase()) === -1) {
            $(li).css("display", "none");
        }
    }
}