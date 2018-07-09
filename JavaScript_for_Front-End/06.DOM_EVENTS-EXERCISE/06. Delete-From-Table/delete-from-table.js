function deleteByEmail() {
    let searchEmail = document.getElementsByName("email");
    let searchEmailName = searchEmail[0].value.trim();

    let customers = document.getElementById("customers");
    let elements = customers.children[0].children;

    let result = document.getElementById("result");

    for (let i = 1; i < elements.length; i++) {
        let email = elements[i].children[1].textContent;

        if (email === searchEmailName) {
            console.log(elements[i].remove());
            result.textContent = "DELETED.";
        } else {
            result.textContent = "Not found.";
        }
    }
}