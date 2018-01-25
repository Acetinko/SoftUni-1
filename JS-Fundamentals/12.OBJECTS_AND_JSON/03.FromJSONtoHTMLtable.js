function fromJSONtoHTMLtable(json) {
    let arr = JSON.parse(json);

    let html = "<table>\n";

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            html += '<tr>';
            for (let key of Object.keys(arr[i])) {
                html += `<th>${htmlEscape(key)}</th>`;
            }
            html += '</tr>\n';
        }

        html += '<tr>';
        for (let value of Object.values(arr[i])) {
            html += `<td>${htmlEscape(value)}</td>`;
        }
        html += '</tr>\n';
    }

    html += "</table>";

    console.log(html);

    function htmlEscape(text) {
        if (!isNaN(text)) {
            return text;
        }

        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }
}

fromJSONtoHTMLtable('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]');