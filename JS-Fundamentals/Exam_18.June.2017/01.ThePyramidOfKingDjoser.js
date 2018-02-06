function thePyramidOfKingDjoser(size, increment) {
    let height = Math.ceil(size / 2);
    let [stone, marble, lapis, gold] = [0, 0, 0, 0];

    for (let i = 1; i <= height - 1; i++) {
        stone += (size - 2) * (size - 2);

        if (i % 5 === 0) {
            lapis += (size * size) - (size - 2) * (size - 2);
        } else {
            marble += (size * size) - (size - 2) * (size - 2);
        }

        size -= 2;
    }

    gold = Math.ceil((size * size) * increment);

    console.log(`Stone required: ${Math.ceil(stone * increment)}`);
    console.log(`Marble required: ${Math.ceil(marble * increment)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapis * increment)}`);
    console.log(`Gold required: ${gold}`);
    console.log(`Final pyramid height: ${Math.floor(height * increment)}`);
}

thePyramidOfKingDjoser(11, 0.75);