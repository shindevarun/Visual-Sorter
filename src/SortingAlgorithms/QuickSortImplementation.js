// note: implemented to always choose last element as pivot of the array in consideration
export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, start, end, animations) {
    if (start >= end) return;

    const pivotIdx = partition(array, start, end, animations);
    quickSortHelper(array, start, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, end, animations);
}

function partition(array, start, end, animations) {
    const pivot = array[end];
    let i = start - 1;

    animations.push({ type: "pivot", index: end });

    for (let j = start; j <= end - 1; j++) {
        animations.push({ type: "compare", indices: [j, end] });

        if (array[j] < pivot) {
            i++;
            animations.push({ type: "swap", indices: [i, j] });
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    i++;
    animations.push({ type: "swap", indices: [i, end] });
    [array[i], array[end]] = [array[end], array[i]];


    return i;
}



