"use strict";
function distanceOverTime(input) {
    let [v1, v2, t] = [input[0], input[1], input[2]];
    let dist1 = (v1 / 3.6) * t;
    let dist2 = (v2 / 3.6) * t;
    let delta = Math.abs(dist1 - dist2);

    console.log(delta);
}

distanceOverTime([0, 60, 3600]);