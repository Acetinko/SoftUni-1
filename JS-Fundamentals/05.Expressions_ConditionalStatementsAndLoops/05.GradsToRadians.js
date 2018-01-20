"use strict";
function gradsToRadians(grads) {
        let degrees = +grads * 3.6 / 4;
        degrees %= 360;

        if (degrees < 0) {
          degrees += 360;
        }

    console.log(degrees);
}

gradsToRadians(-50);