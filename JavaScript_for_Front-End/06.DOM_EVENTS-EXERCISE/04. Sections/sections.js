function create(sentences) {

    let divContent = document.getElementById("content");

    for (let i = 0; i < sentences.length; i++) {
        let newDiv = document.createElement("div");
        let newParagraph = document.createElement("p");
        newDiv.appendChild(newParagraph);

        newParagraph.style.display = "none";
        newParagraph.textContent = sentences[i];
        divContent.appendChild(newDiv);
    }

    let elements =  divContent.querySelectorAll("div");
    for (let i = 0; i <elements.length; i++) {
        elements[i].addEventListener("click", function (ev) {
            let p = ev.target.children[0];
            if (p.style.display === "none") {
                p.style.display = "block";
            } else {
                p.style.display = "none";
            }
        });
    }
}