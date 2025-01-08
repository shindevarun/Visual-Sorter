export function getSelectionSortAnimations(array) {
    const animations = [];

    for(let i = 0; i < array.length; i++) {
        let minIndex = i;
        for(let j = i+1; j < array.length; j++) {
            animations.push({ type: "compare", indices: [j, minIndex] });
            if(array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        animations.push({ type: "swap", indices: [i, minIndex] });
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        animations.push({ type: "sorted", index: i });
    }

    return animations;
}