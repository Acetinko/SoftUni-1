"use strict";

function colorfulNumbers(num) {
    let html = '<ul>\n';
    for (let i = 1; i <= num; i++) {
        let color = 'blue';

        if (i % 2 !== 0) {
            color = 'green';
        }
        html += `  <li><span style='color: ${color}'>${i}</span></li>\n`;
    }
    html += '</ul>';

    console.log(html);
}

colorfulNumbers(10);