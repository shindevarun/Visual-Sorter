export function getInsertionSortAnimations(array) {
    const animations = [];

    for(let i = 1; i < array.length; i++) {
        let j = i;
        while(j > 0 && array[j-1] > array[j]) {
            animations.push({ type: "compare", indices: [j-1, j]});
            [array[j], array[j-1]] = [array[j-1], array[j]];
            j--;
            animations.push({ type: "swap", indices: [j, j+1]});
        }
    }
    
    return animations;
}