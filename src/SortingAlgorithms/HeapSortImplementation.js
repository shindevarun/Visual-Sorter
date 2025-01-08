export function getHeapSortAnimations(array) {
    const n = array.length;
    const animations = [];

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    for(let i = n - 1; i > 0; i--) {
        animations.push({type: "heap-pop", indices: [0, i]});
        [array[0], array[i]] = [array[i], array[0]];

        heapify(array, i, 0, animations);
    }

    return animations;
}

function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if(left < n && array[left] > array[largest]) {
        animations.push({type: "compare", indices: [i, left]});
        largest = left;
    }

    if(right < n && array[right] > array[largest]) {
        animations.push({type: "compare", indices: [i, right]});
        largest = right;
    }


    if (largest !== i) {
        animations.push({type: "compare", indices: [i, largest]});
        animations.push({type: "swap", indices: [i, largest]});
        [array[i], array[largest]] = [array[largest], array[i]];

        heapify(array, n, largest, animations);
    }
}