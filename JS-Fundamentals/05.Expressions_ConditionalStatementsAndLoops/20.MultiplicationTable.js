"use strict";
function multiplicationTable(n) {
    let html = '<table border="1">\n';

    for (let row = 0; row <= n; row++) {
        if (row === 0) {
          html += '<tr><th>x</th>';
          for (let i = 1; i <= n; i++) {
              html += `<th>${i}</th>`;
          }
            html += '</tr>\n';
            continue;
        }

        html += `<tr><th>${row}</th>`;
        for (let col = row; col <= row * n; col++) {
            if (parseInt(col % row) === 0) {
                html += `<td>${col}</td>`;
            }
        }
        html += '<tr>\n';
    }

    html += "</table>";
    return html;
}


document.body.innerHTML = multiplicationTable(5);