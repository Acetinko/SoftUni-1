function createBook(selector, bookTitle, authorName, isbn) {
    let id = 1;
    let bookGenerator = (function () {

        return function (selector, bookTitle, authorName, isbn) {

            let container = $(selector);
            let bookContainer = $("<div>");

            bookContainer.attr("id", `book${id}`);
            bookContainer.css("border", "none");

            $(`<p class="title">${bookTitle}</p>`)
                .appendTo(bookContainer);
            $(`<p class="title">${authorName}</p>`)
                .appendTo(bookContainer);
            $(`<p class="title">${isbn}</p>`)
                .appendTo(bookContainer);

            let selectBtn = $("<button>Select</button>");
            let deselectBtn = $("<button>Deselect</button>");

            selectBtn.on("click", () => bookContainer.css("border", "2px solid blue"));
            deselectBtn.on("click", () => bookContainer.css("border", "none"));

            selectBtn.appendTo(bookContainer);
            deselectBtn.appendTo(bookContainer);

            bookContainer.appendTo(container);

            console.log(id++);
        }
    }());

    bookGenerator(selector, bookTitle, authorName, isbn);
}