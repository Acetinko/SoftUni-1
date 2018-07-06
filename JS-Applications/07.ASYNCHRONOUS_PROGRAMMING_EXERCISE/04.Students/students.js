function solve() {
    const serviceUrl = "https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students";
    const username = "guest";
    const password = "guest";
    const base64Auth = btoa(username + ':' + password);

    function loadStudents() {
        let request = {
            url: serviceUrl,
            method: "GET",
            headers: {"Authorization": "Basic " + base64Auth}
        };

        $.ajax(request)
            .then(displayStudents)
            .catch(displayError);
    }

    function displayStudents(students) {
        students.sort((a, b) => Number(a.ID) - Number(b.ID));

        for (let student of students) {
            $("#results").append($("<tr>")
                .append($("<td>").text(student.ID))
                .append($("<td>").text(student.FirstName))
                .append($("<td>").text(student.LastName))
                .append($("<td>").text(student.FacultyNumber))
                .append($("<td>").text(student.Grade))
            );
        }
    }

    function displayError(err){
        console.log(err);
    }

    loadStudents();
}