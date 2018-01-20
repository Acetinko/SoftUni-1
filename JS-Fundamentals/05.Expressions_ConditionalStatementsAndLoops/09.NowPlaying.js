"use strict";
function nowPlaying(arrInput) {
    let [trackName, artistName, duration] = arrInput;

    console.log(`Now Playing: ${artistName} - ${trackName} [${duration}]`);
}

nowPlaying(['Number One', 'Nelly', '4:09']);