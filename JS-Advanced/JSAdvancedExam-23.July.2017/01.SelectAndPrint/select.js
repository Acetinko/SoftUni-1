function move(command) {
    let availableTowns = $("#available-towns");
    let selectedTowns = $("#selected-towns");
    let output = $("#output");

    if (command === "right") {
        //let selectItems = availableTowns.find(":selected");
        selectedTowns.append(availableTowns.find(":selected"));
    } else if (command === "left") {
        availableTowns.append(selectedTowns.find(":selected"));
    } else if (command === "print") {
        output.empty();

        output.text(selectedTowns
            .find("option")
            .toArray()
            .map(e => e.textContent)
            .join("; ")
        );
    }
}