function figureArea(w, h, w2, h2) {
    let [s1, s2, s3] =
    [w * h, w2 * h2, Math.min(w, w2) * Math.min(h, h2)];
    let area = s1 + s2 - s3;

    console.log(area);
}

figureArea(2, 4, 5, 3);