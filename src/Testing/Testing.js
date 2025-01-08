// testing suite that tests that the different algorithms work as intended.
// uncomment the "test" button in the render function and use it to test.
// If all testcases pass, this function logs that message to the console
export function testSortingAlgorithms() {
    let mergeArray = true;
    let quickArray = true;
    let heapArray = true;
    let bubbleArray = true;
    let insertionArray = true;
    let selectionArray = true;

    for(let i = 0; i < 100; i++) {
        const array = [];
        const length = localRandomIntFromInterval(1, 1000);
        for(let i = 0; i < length; i++) {
            array.push(localRandomIntFromInterval(-500, 500));
        }
        const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        const mergeSortedArray = localMergeSort(array.slice());
        const quickSortedArray = localQuickSort(array.slice());
        const heapSortedArray = localHeapSort(array.slice());
        const bubbleSortedArray = localBubbleSort(array.slice());
        const insertionSortedArray = localInsertionSort(array.slice());
        const selectionSortedArray = localSelectionSort(array.slice());
        
        if(!arraysAreEqual(javaScriptSortedArray, mergeSortedArray)) {
            mergeArray = false;
        } 

        if(!arraysAreEqual(javaScriptSortedArray, quickSortedArray)) {
            quickArray = false;
        }

        if (!arraysAreEqual(javaScriptSortedArray, heapSortedArray)) {
            heapArray = false;
        }

        if (!arraysAreEqual(javaScriptSortedArray, bubbleSortedArray)) {
            bubbleArray = false;
        }

        if (!arraysAreEqual(javaScriptSortedArray, insertionSortedArray)) {
            insertionArray = false;
        }
        
        if (!arraysAreEqual(javaScriptSortedArray, selectionSortedArray)) {
            selectionArray = false;
        }
    }

    if(mergeArray == true) {
        console.log("MergeSort: All tests passed!");
    } 

    if(quickArray == true) {
        console.log("QuickSort: All tests passed!");
    }

    if(heapArray == true) {
        console.log("HeapSort: All tests passed!");
    }

    if(bubbleArray == true) {
        console.log("BubbleSort: All tests passed!");
    }

    if(insertionArray == true) {
        console.log("InsertionSort: All tests passed!");
    }

    if(selectionArray == true) {
        console.log("SelectionSort: All tests passed!");
    }
}


function arraysAreEqual(arrayOne, arrayTwo) {
    if(arrayOne.length !== arrayTwo.length) return false;
    for(let i = 0; i < arrayOne.length; i++) {
        if(arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}   


function localMergeSort(array) {
    if(array.length === 1) return array;
    const middleIdx = Math.floor(array.length / 2);
    const firstHalf = localMergeSort(array.slice(0, middleIdx));
    const secondHalf = localMergeSort(array.slice(middleIdx));

    const sortedArray = [];
    let i = 0, j = 0;

    while(i < firstHalf.length && j < secondHalf.length) {
        if(firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++]);
        } else {
            sortedArray.push(secondHalf[j++]);
        }
    }

    while(i < firstHalf.length) sortedArray.push(firstHalf[i++]);
    while(j < secondHalf.length) sortedArray.push(secondHalf[j++]);
    return sortedArray;
}


function localQuickSort(array) {
    if(array.length === 1) return array;
    localQuickSortHelper(array, 0, array.length - 1);
    return array;
}

function localQuickSortHelper(array, start, end) {
    if (end <= start) {
        return; // base case
    }

    const pivot = localPartition(array, start, end);
    localQuickSortHelper(array, start, pivot - 1);
    localQuickSortHelper(array, pivot + 1, end);
}

function localPartition(array, start, end) {
    const pivot = array[end];
    let i = start - 1;

    for (let j = start; j <= end - 1; j++) {
        if (array[j] < pivot) {
            i++;
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    i++;
    const temp = array[i];
    array[i] = array[end];
    array[end] = temp;

    return i;
}

function localHeapSort(array) {
    const n = array.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        localHeapify(array, n, i);
    }

    for(let i = n - 1; i > 0; i--) {
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];

        // heapify top element since it's not the largest anymore
        localHeapify(array, i, 0);
    }

    return array;
}

function localHeapify(array, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if(left < n && array[left] > array[largest]) {
        largest = left;
    }

    if(right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];

        localHeapify(array, n, largest);
    }
}

function localBubbleSort(array) {
    if(array.length === 1) return array;
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - i - 1; j++) {
            if(array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }

    return array;
}

function localInsertionSort(array) {
    if(array.length === 1) return array;
    
    for(let i = 1; i < array.length; i++) {
        let j = i;
        while(j > 0 && array[j-1] > array[j]) {
            [array[j], array[j-1]] = [array[j-1], array[j]];
            j--;
        }
    }

    return array;
}

function localSelectionSort(array) {
    if(array.length === 1) return array;

    for(let i = 0; i < array.length; i++) {
        let minIndex = i;
        for(let j = i+1; j < array.length; j++) {
            if(array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    return array;
}


function localRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
