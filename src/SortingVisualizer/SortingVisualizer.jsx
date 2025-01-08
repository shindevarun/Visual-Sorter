import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSortImplementation.js";
import { getQuickSortAnimations } from "../SortingAlgorithms/QuickSortImplementation.js";
import { getHeapSortAnimations } from "../SortingAlgorithms/HeapSortImplementation.js";
import { getBubbleSortAnimations } from "../SortingAlgorithms/BubbleSortImplementation.js";
import { getInsertionSortAnimations } from "../SortingAlgorithms/InsertionSortImplementation.js";
import { getSelectionSortAnimations } from "../SortingAlgorithms/SelectionSortImplementation.js";
import { testSortingAlgorithms } from "../Testing/Testing.js";


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            containerHeight: 0,
            numBars: 50,
            animationSpeed: 5,
            selectedAlgorithm: null,
            pressedButton: null,
            comparisons: "--",
            swaps: "--",
            executionTime: "--",
        };

        this.arrayContainerRef = React.createRef();
    }


    // reset function to generate random values for the initial unsorted array and reset the states
    // of appropriate attributes
    resetArray = () => {
        const array = [];
        const { numBars } = this.state;
        for(let i = 0; i < numBars; i++) {
            let randomHeight = randomIntFromInterval(15, 800);
            array.push(randomHeight)
        }

        this.setState({ array }, () => {
            const arrayBars = document.getElementsByClassName("array-bar");
            for(let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = "grey";
            }
        });
        
        this.setState({ array, comparisons: "--", swaps: "--", executionTime: 0 });
    }


    // Calls the custom MergeSortImplementation in order to create an animations array and
    // then uses the animations array to showcase the user's array being sorted using merge sort
    mergeSort() {
        const startTime = performance.now();

        const animations = getMergeSortAnimations(this.state.array);

        const arrayBars = document.getElementsByClassName("array-bar");
        const arrayContainer = document.querySelector('.array-container');

        const totalAnimations = animations.length;
        const maxHeight = arrayContainer.clientHeight;
        const maxValue = Math.max(...this.state.array);

        let localComparisons = 0;
        let localSwaps = 0;


        for (let i = 0; i < animations.length; i++) {
            const {type, indices} = animations[i];

            if (type === "compare") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = "blue";
                    barTwoStyle.backgroundColor = "blue";
                    localComparisons++;
                }, i * this.state.animationSpeed);

                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            } else if (type === "overwrite") {
                const [barIdx, newHeight] = indices;
                const barStyle = arrayBars[barIdx].style;

                setTimeout(() => {
                    barStyle.height = `${0.85 * (newHeight / maxValue) * maxHeight}px`;
                    barStyle.backgroundColor = "red";
                    localSwaps++;
                }, i * this.state.animationSpeed);

                setTimeout(() => {
                    barStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            }
        }

        
        setTimeout(() => {
            for (let i = 0; i < arrayBars.length; i++) {
                const barStyle = arrayBars[i].style;
                setTimeout(() => {
                    barStyle.backgroundColor = "green";
                }, i * this.state.animationSpeed);
            }
            const endTime = performance.now();

            this.setState({ 
                comparisons: localComparisons,
                swaps: localSwaps,  
                executionTime: endTime - startTime, 
            });
        }, totalAnimations * this.state.animationSpeed);
    }


    // Calls the custom QuickSortImplementation in order to create an animations array and
    // then uses the animations array to showcase the user's array being sorted using quick sort
    quickSort() {
        const startTime = performance.now();

        const animations = getQuickSortAnimations(this.state.array);

        const arrayBars = document.getElementsByClassName("array-bar");

        const totalAnimations = animations.length;

        let localComparisons = 0;
        let localSwaps = 0;
    

        for (let i = 0; i < animations.length; i++) {
            const { type, indices, index } = animations[i];
    
            if (type === "compare") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "blue";
                    localComparisons++;
                }, i * this.state.animationSpeed);
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
    
            } else if (type === "swap") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
    
                setTimeout(() => {
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
    
                    barOneStyle.backgroundColor = "red";
                    barTwoStyle.backgroundColor = "red";
                    localSwaps++;
                }, i * this.state.animationSpeed);
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
    
            } else if (type === "pivot") {
                const pivotBarStyle = arrayBars[index].style;
    
                setTimeout(() => {
                    pivotBarStyle.backgroundColor = "black";
                }, i * this.state.animationSpeed);
            } 
        }

        setTimeout(() => {
            for (let i = 0; i < arrayBars.length; i++) {
                const barStyle = arrayBars[i].style;
                setTimeout(() => {
                    barStyle.backgroundColor = "green";
                }, i * this.state.animationSpeed);
            }
            const endTime = performance.now();

            this.setState({ 
                comparisons: localComparisons,
                swaps: localSwaps,  
                executionTime: endTime - startTime, 
            });
        }, totalAnimations * this.state.animationSpeed);

    }


    // Calls the custom HeapSortImplementation in order to create an animations array and
    // then uses the animations array to showcase the user's array being sorted using heap sort
    heapSort() {
        const startTime = performance.now();

        const animations = getHeapSortAnimations(this.state.array);

        const arrayBars = document.getElementsByClassName("array-bar");

        const totalAnimations = animations.length;

        let localComparisons = 0;
        let localSwaps = 0;

    
        for (let i = 0; i < animations.length; i++) {
            const { type, indices } = animations[i];
    
            if (type === "compare") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "blue";
                    barTwoStyle.backgroundColor = "blue";
                    localComparisons++;
                }, i * this.state.animationSpeed);
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
    
            } else if (type === "swap") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
    
                setTimeout(() => {
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
    
                    barOneStyle.backgroundColor = "red";
                    barTwoStyle.backgroundColor = "red";
                    localSwaps++;
                }, i * this.state.animationSpeed);
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
    
            }  else if (type === "heap-pop") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
    
                    barOneStyle.backgroundColor = "green";
                    barTwoStyle.backgroundColor = "green";
                    localSwaps++;
                }, i * this.state.animationSpeed);
    
            }
        }

        setTimeout(() => {
            const endTime = performance.now();

            this.setState({ 
                comparisons: localComparisons,
                swaps: localSwaps,  
                executionTime: endTime - startTime, 
            });
        }, totalAnimations * this.state.animationSpeed);
    }


    // Calls the custom BubbleSortImplementation in order to create an animations array and
    // then uses the animations array to showcase the user's array being sorted using bubble sort
    bubbleSort() {
        const startTime = performance.now();

        const animations = getBubbleSortAnimations(this.state.array);

        const arrayBars = document.getElementsByClassName("array-bar");

        const totalAnimations = animations.length;

        let localComparisons = 0;
        let localSwaps = 0;


        for(let i = 0; i < animations.length; i++) {
            const { type, indices, index } = animations[i];

            if (type === "compare") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = "blue";
                    barTwoStyle.backgroundColor = "blue";
                    localComparisons++;
                }, i * this.state.animationSpeed);

                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            } else if (type === "swap") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
    
                    barOneStyle.backgroundColor = "red";
                    barTwoStyle.backgroundColor = "red";
                    localSwaps++;
                }, i * this.state.animationSpeed);
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            } else if (type === "sorted") {
                const barStyle = arrayBars[index].style;
                setTimeout(() => {
                    barStyle.backgroundColor = "green";
                }, i * this.state.animationSpeed);
            }
        }

        setTimeout(() => {
            const endTime = performance.now();

            this.setState({ 
                comparisons: localComparisons,
                swaps: localSwaps,  
                executionTime: endTime - startTime, 
            });
        }, totalAnimations * this.state.animationSpeed);
    }


    // Calls the custom InsertionSortImplementation in order to create an animations array and
    // then uses the animations array to showcase the user's array being sorted using insertion sort
    insertionSort() {
        const startTime = performance.now();

        const animations = getInsertionSortAnimations(this.state.array);

        const arrayBars = document.getElementsByClassName("array-bar");

        const totalAnimations = animations.length;

        let localComparisons = 0;
        let localSwaps = 0;


        for(let i = 0; i < animations.length; i++) {
            const {type, indices} = animations[i];

            if (type === "compare") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = "blue";
                    barTwoStyle.backgroundColor = "blue";
                    localComparisons++;
                }, i * this.state.animationSpeed);

                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            } else if (type === "swap") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
    
                    barOneStyle.backgroundColor = "red";
                    barTwoStyle.backgroundColor = "red";
                    localSwaps++;
                }, i * this.state.animationSpeed);
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            }

            setTimeout(() => {
                for (let i = 0; i < arrayBars.length; i++) {
                    const barStyle = arrayBars[i].style;
                    setTimeout(() => {
                        barStyle.backgroundColor = "green";
                    }, i * this.state.animationSpeed);
                }

                const endTime = performance.now();
                this.setState({
                    comparisons: localComparisons,
                    swaps: localSwaps,
                    executionTime: endTime - startTime,
                });
            }, totalAnimations * this.state.animationSpeed);
        }
    }


    // Calls the custom SelectionSortImplementation in order to create an animations array and
    // then uses the animations array to showcase the user's array being sorted using selection sort
    selectionSort() {
        const startTime = performance.now();

        const animations = getSelectionSortAnimations(this.state.array);

        const arrayBars = document.getElementsByClassName("array-bar");

        const totalAnimations = animations.length;

        let localComparisons = 0;
        let localSwaps = 0;

        for(let i = 0; i < animations.length; i++) {
            const { type, indices, index } = animations[i];

            if (type === "compare") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = "blue";
                    barTwoStyle.backgroundColor = "blue";
                    localComparisons++;
                }, i * this.state.animationSpeed);

                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            } else if (type === "swap") {
                const [barOneIdx, barTwoIdx] = indices;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;
    
                    barOneStyle.backgroundColor = "red";
                    barTwoStyle.backgroundColor = "red";
                    localSwaps++;
                }, i * this.state.animationSpeed);
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = "grey";
                    barTwoStyle.backgroundColor = "grey";
                }, (i + 1) * this.state.animationSpeed);
            } else if (type === "sorted") {
                const barStyle = arrayBars[index].style;
                setTimeout(() => {
                    barStyle.backgroundColor = "green";
                }, i * this.state.animationSpeed);
            }
        }

        setTimeout(() => {
            const endTime = performance.now();

            this.setState({ 
                comparisons: localComparisons,
                swaps: localSwaps,  
                executionTime: endTime - startTime, 
            });
        }, totalAnimations * this.state.animationSpeed);
    }


    // component & container helper functions
    componentDidMount() {
        this.resetArray();
        this.updateContainerHeight();
        window.addEventListener('resize', this.updateContainerHeight); // Update height on resize
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateContainerHeight);
    }

    updateContainerHeight = () => {
        if (this.arrayContainerRef.current) {
            this.setState({
                containerHeight: this.arrayContainerRef.current.offsetHeight,
            });
        }
    };

    selectedAlgorithm = (algorithm) => {
        this.setState({
            selectedAlgorithm: algorithm,
        });
    };


    // button toggle helper function
    toggleButton = (algorithm) => {
        this.setState((prevState) => ({
            pressedButton: prevState.pressedButton === algorithm ? null : algorithm,
            selectedAlgorithm: prevState.pressedButton === algorithm ? null : algorithm,
        }));
    };


    // slider animation helper functions
    handleSliderChange = (event) => {
        const numBars = parseInt(event.target.value);
        this.setState({ numBars }, () => this.resetArray());
    }

    handleAnimationSliderChange = (event) => {
        const animationSpeed = parseFloat(event.target.value);
        this.setState({ animationSpeed });
    }


    // call the apropriate algorithm depending on the state
    runSelectedAlgorithm = () => {
        const { selectedAlgorithm, } = this.state;
        if (selectedAlgorithm === "mergeSort") {
            this.mergeSort();
        } else if (selectedAlgorithm === "quickSort") {
            this.quickSort();
        } else if (selectedAlgorithm === "heapSort") {
            this.heapSort();
        } else if (selectedAlgorithm === "bubbleSort") {
            this.bubbleSort();
        } else if (selectedAlgorithm === "insertionSort") {
            this.insertionSort();
        } else if (selectedAlgorithm === "selectionSort") {
            this.selectionSort();
        }
    };

    
    // remder function to render the whole page
    render() { 
        const { array, pressedButton, numBars, comparisons, swaps, executionTime} = this.state;
        const maxArrayValue = Math.max(...array);
        const maxAnimationSpeed = 250 / numBars;
        const minAnimationSpeed = maxAnimationSpeed * 20;
        const containerHeight = this.state.containerHeight;
    
        return (
            <div className="container">

                {/* sidebar controls */}
                <div className="sidebar">
                    <div className="title">
                        <h2>Sorting Visualization Animation</h2>
                    </div>
                    <button onClick={() => this.resetArray()}>Generate New Random Array</button>
                    <div className = "button-container">
                        <button
                            className={pressedButton === 'mergeSort' ? 'pressed' : ''}
                            onClick={() => this.toggleButton('mergeSort')}
                        >
                            Merge Sort
                        </button>
                        <button
                            className={pressedButton === 'quickSort' ? 'pressed' : ''}
                            onClick={() => this.toggleButton('quickSort')}
                        >
                            Quick Sort
                        </button>
                    </div>
                    <div className = "button-container">
                        <button
                            className={pressedButton === 'heapSort' ? 'pressed' : ''}
                            onClick={() => this.toggleButton('heapSort')}
                        >
                            Heap Sort
                        </button>
                        <button
                            className={pressedButton === 'bubbleSort' ? 'pressed' : ''}
                            onClick={() => this.toggleButton('bubbleSort')}
                        >
                            Bubble Sort
                        </button>
                    </div>
                    <div className = "button-container">
                        <button
                            className={pressedButton === 'insertionSort' ? 'pressed' : ''}
                            onClick={() => this.toggleButton('insertionSort')}
                        >
                            Insertion Sort
                        </button>
                        <button
                            className={pressedButton === 'selectionSort' ? 'pressed' : ''}
                            onClick={() => this.toggleButton('selectionSort')}
                        >
                            Selection Sort
                        </button>
                    </div>

                    {/* <button onClick={() => testSortingAlgorithms()}>Test</button> */}

                    <button onClick={this.runSelectedAlgorithm}>Run</button>

                    <label class="slider-label">Number of Bars: <span>{this.state.numBars}</span></label>

                    <input 
                        type="range" 
                        min="5" 
                        max="200" 
                        value={this.state.numBars} 
                        onChange={this.handleSliderChange}
                        class="slider" 
                        id="myRange">
                    </input>

                    <label class="slider-label">Animation Speed</label>

                    <input 
                        type="range" 
                        min={maxAnimationSpeed}
                        max={minAnimationSpeed} 
                        step="0.1"
                        value={this.state.animationSpeed} 
                        onChange={this.handleAnimationSliderChange}
                        class="slider" 
                        id="animationRange">
                    </input>
                    
                </div>

                {/* main content box*/}
                <div className="main-content">
                    <div 
                        className="array-container" 
                        ref={this.arrayContainerRef}
                    >
                        <div className="counters">
                            <p>Comparisons: {comparisons}</p>
                            <p>Swaps: {swaps}</p>
                            <p>Execution Time: {(executionTime/1000).toFixed(2)} s</p>
                        </div>
                        
                        {array.map((value, idx) => {
                            const barHeight = (0.85 * containerHeight * value) / maxArrayValue;
                            return (
                                <div 
                                    className="array-bar" 
                                    key={idx}
                                    style={{height: `${barHeight}px`}}>
                                </div>
                            );
                        })}
                    </div>
                    

                    {/* color legend */}
                    <div className="legend">
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: "grey" }}></span>
                            Unsorted values
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: "blue" }}></span>
                            Values being compared
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: "red" }}></span>
                            Values being swaped
                        </div>  
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: "black" }}></span>
                            Pivot (merge sort)
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ backgroundColor: "green" }}></span>
                            Sorted values
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// helper function to get a random number from the given interval
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}