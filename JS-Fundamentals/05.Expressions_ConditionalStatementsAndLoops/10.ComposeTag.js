"use strict";
function composeTag(arrInput) {
    let [locationFile, alternateText] = arrInput;

    console.log(`<img src="${locationFile}" alt="${alternateText}">`);
}

composeTag(['smiley.gif', 'Smiley Face']);