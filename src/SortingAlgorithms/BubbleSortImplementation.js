export function getBubbleSortAnimations(array) {
    const animations = [];

    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - i - 1; j++) {
            animations.push({ type: "compare", indices: [j, j+1] }); // comparing the values
            if(array[j] > array[j+1]) {
                animations.push({ type: "swap", indices: [j, j+1] }); // swapping the values
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
        animations.push({ type: "sorted", index: array.length - i - 1 }); // marking the sorted elements
    }

    return animations;
}