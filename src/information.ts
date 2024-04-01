import { AlgorithmInformation, Algorithm } from "./types";

export const information: Record<Algorithm, AlgorithmInformation> = {
  BubbleSort: {
    description:
      'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The name "Bubble" comes from the way smaller elements "bubble" to the top of the list with each iteration.',
    time: {
      avg: "O(n^2)",
      best: "O(n)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  QuickSort: {
    description:
      "Quick Sort is a sorting algorithm that follows the Divide and Conquer approach. It works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The process is then applied recursively to the sub-arrays.",
    time: {
      avg: "O(n log n)",
      best: "O(n log n)",
      worst: "O(n^2)",
      space: "O(log n)",
    },
  },
  InsertionSort: {
    description:
      "Insertion Sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It works by repeatedly taking the next item from the unsorted part of the array and inserting it into its correct position within the sorted part of the array. It does this by shifting all the elements greater than the current element to one position ahead of their current position.",
    time: {
      avg: "O(n^2)",
      best: "O(n)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  SelectionSort: {
    description:
      "Selection Sort is a simple sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted. It repeatedly selects the minimum (or maximum) element from the unsorted sublist and swaps it with the leftmost unsorted element, thus expanding the sorted sublist by one element.",
    time: {
      avg: "O(n^2)",
      best: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  MergeSort: {
    description:
      "Merge Sort is a comparison-based sorting algorithm that follows the Divide and Conquer approach. It divides the input array into two halves, sorts each half separately, and then merges the sorted halves to produce a single sorted array.",
    time: {
      avg: "O(n log n)",
      best: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
    },
  },
  HeapSort: {
    description:
      "Heap Sort is a comparison-based sorting algorithm that builds a max-heap (or min-heap) from the input array and then repeatedly extracts the maximum (or minimum) element from the heap, ensuring that the heap property is maintained. The extracted elements are placed at the end of the array, effectively sorting it.",
    time: {
      avg: "O(n log n)",
      best: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)",
    },
  },
  ShakerSort: {
    description: "Shaker Sort, also known as Cocktail Sort or Bidirectional Bubble Sort, is a variation of the Bubble Sort algorithm. It improves on Bubble Sort by allowing the sorting process to proceed in both directions (forward and backward) through the array.",
    time: {
      avg: "O(n^2)",
      best: "O(n)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
};
