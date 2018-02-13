function surveyParser(text) {
    let pattern = /(<svg>)((?:.|\n)+)(<\/svg>)/g;

    let result = '';
    let sum = 0;
    let count = 0;

    if (pattern.test(text)) {

        let regexSvr = new RegExp("(<svg>)((?:.|\\n)+)(<\/svg>)", "g");
        while (matchSvr = regexSvr.exec(text)) {

            let regexCat = new RegExp("(<cat>)((?:.|\\n)+)(<\\/cat>)", "g");
            while (matchCat = regexCat.exec(matchSvr[2])) {

                let regexText = new RegExp("(<text>)((?:.|\\n)+)(<\\/text>)", "g");
                while (matchText = regexText.exec(matchCat[2])) {

                    pattern = /(\[)((?:.|\n)+)(\])/g;
                    if (pattern.test(matchText[2])){
                       let regexLabel = new RegExp("(\\[)((?:.|\\n)+)(\\])", "g");
                        let matchLabel =  regexLabel.exec(matchText[2].trim());
                        result = matchLabel[2].trim();
                    }
                }

                let regexVal = new RegExp("(<g><val>)(\\d+)(<\\/val>)(\\d+)(<\\/g>)", "g");
                while (matchVal = regexVal.exec(matchCat[2])) {
                    matchVal[2] = Number(matchVal[2]);
                    matchVal[4] = Number(matchVal[4]);

                    if (matchVal[2] === undefined || matchVal[4] === undefined) {
                        continue;
                    }

                    if (matchVal[2] >= 0  && matchVal[4] >= 0) {
                        count += matchVal[4];
                        sum += (matchVal[2] * matchVal[4]);
                    }
                }
            }
        }

        if (result.length > 0) {
            let r = Number((sum / count).toFixed(2));
            console.log(`${result}: ${(r * 100) / 100}`);
        } else {
            console.log('Invalid format');
        }

    } else {
        console.log("No survey found");
    }
}

surveyParser('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>');

surveyParser('<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>');

surveyParser('<p>How do you suggest we improve our service?</p><p>More tacos.</p><p>It\'s great, don\'t mess with it!</p><p>I\'d like to have the option for delivery</p>');

surveyParser('<svg><cat><text>Which is your favourite meal from our selection?</text></cat><cat><g><val>Fish</val>15</g><g><val>Prawns</val>31</g><g><val>Crab Langoon</val>12</g><g><val>Calamari</val>17</g></cat></svg>');