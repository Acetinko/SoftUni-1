function addItem() {
    let text = document.getElementById("newItemText");
    let value = document.getElementById("newItemValue");

    let newOption = document.createElement("option");
    newOption.setAttribute("value", value.value);
    newOption.textContent = text.value;
    let select = document.getElementById("menu");

    text.value = '';
    value.value = '';

    select.appendChild(newOption);
}
