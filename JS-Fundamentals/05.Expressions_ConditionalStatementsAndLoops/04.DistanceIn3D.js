"use strict";
function distanceIn3D(input) {

    let [x1, y1, z1, x2, y2, z2] =
        [input[0], input[1], input[2], input[3], input[4], input[5]];

    let deltaX = x1 - x2;
    let deltaY = y1 - y2;
    let deltaZ = z1 - z2;

    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

    console.log(distance);
}

distanceIn3D([3.5, 0, 1, 0, 2, -1]);