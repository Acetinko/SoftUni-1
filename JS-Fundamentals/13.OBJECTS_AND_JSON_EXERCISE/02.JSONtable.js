function jsonTable(arr) {
    let html = "<table>\n";
    for (let i = 0; i < arr.length; i++) {
        let obj = JSON.parse(arr[i]);
        html += `\t<tr>\n\t\t<td>${obj.name}</td>\n`;
        html += `\t\t<td>${obj.position}</td>\n`;
        html += `\t\t<td>${obj.salary}</td>\n\t<tr>\n`;
    }
    html += "</table>";
    console.log(html);
}

jsonTable([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]);