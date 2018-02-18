function search() {
    let searchText = $("#searchText").val();
    let matches = $(`ul#towns li:contains(${searchText})`);
    matches.css("font-weight", "bold");

    $("#result").text(`${matches.length} matches found.`);
}