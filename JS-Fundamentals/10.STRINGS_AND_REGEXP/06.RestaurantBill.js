function restaurantBil(arr) {
    let messages = arr.filter((x, i) => i % 2 === 0 );
    let sum = arr.filter((x, i) => i % 2 !== 0)
        .map(Number)
        .reduce((a, b) => a + b);

    console.log(`You purchased ${messages.join(', ')} for a total sum of ${sum}`);
}

restaurantBil(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);

restaurantBil(['Cola', '1.35', 'Pancakes', '2.88']);