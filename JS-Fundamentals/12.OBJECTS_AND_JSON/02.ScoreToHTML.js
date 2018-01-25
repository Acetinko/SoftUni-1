function scoreToHTML(str) {
    let arr = JSON.parse(str);

    let html = "<table>\n";
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {

            let [name, score] = Object.keys(arr[i]);
            html += `<tr><th>${htmlEscape(name)}</th><th>${htmlEscape(score)}</th></tr>\n`;
        }

        let [name, score] = Object.values(arr[i]);
        html += `<tr><td>${htmlEscape(name)}</td><td>${Number(score)}</td></tr>\n`;
    }

    html += "</table>";

    console.log(html);

    function htmlEscape(text) {
        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }
}

scoreToHTML('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]');
scoreToHTML('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]');

