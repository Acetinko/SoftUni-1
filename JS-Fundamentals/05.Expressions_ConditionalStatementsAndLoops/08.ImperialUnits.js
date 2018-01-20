"use strict";
function imperialUnits(inches) {
    let feet = Number.parseInt(inches / 12);

    inches %= 12;

    console.log(`${feet}'-${inches}"`);
}

imperialUnits(36);