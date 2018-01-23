function countOccurrences(str, text) {
    let index = text.indexOf(str);
    let count = 0;

    while (index !== -1) {
        index++;
        index = text.indexOf(str, index);
        count++;
    }
    
    console.log(count);
}

countOccurrences('the', 'the quick brown fox jumps over the lay dog');
countOccurrences('haha', 'hahaha');
countOccurrences('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.');