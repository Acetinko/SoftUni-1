function toggle() {
    let button = document.getElementsByClassName("button");
    let extra = document.getElementById("extra");

    if (button[0].textContent === "More") {
        extra.style.display = "block";
        button[0].textContent = "Less";
    } else {
        extra.style.display = "none";
        button[0].textContent = "More";
    }
}