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
    description:
      "Shaker Sort, also known as Cocktail Sort or Bidirectional Bubble Sort, is a variation of the Bubble Sort algorithm. It improves on Bubble Sort by allowing the sorting process to proceed in both directions (forward and backward) through the array.",
    time: {
      avg: "O(n^2)",
      best: "O(n)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  GnomeSort: {
    description:
      'Gnome Sort, also known as Stupid Sort or Slow Sort, is a simple sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order, similar to Bubble Sort. However, Gnome Sort also has a "backward" step where it moves one position back in the list to check the previous elements. \n\nGnome Sort is named after the behavior of a garden gnome who sorts a line of flower pots. The gnome will compare adjacent pots and swap them if they are in the wrong order, but if they are in the correct order, the gnome will move to the next pot. If a swap occurs, the gnome will go back to the previous position to check again.',
    time: {
      avg: "O(n^2)",
      best: "O(n)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  OddEvenSort: {
    description:
      "Odd-Even Sort, also known as Brick Sort, is a variation of the Bubble Sort algorithm. It is designed to improve upon Bubble Sort by allowing comparisons and swaps of adjacent elements in parallel.\n\nOdd-even sort is particularly suited for parallel implementations because the odd-phase and even-phase comparisons can be performed independently. However, it's important to note that the sorting performance of Odd-Even Sort is generally not as efficient as more traditional sorting algorithms like Quick Sort or Merge Sort.",
    time: {
      avg: "O(n^2)",
      best: "O(n)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  PancakeSort: {
    description:
      "Pancake Sort is a sorting algorithm that sorts a sequence by repeatedly flipping the elements in the sequence. The basic idea is to make the largest unsorted element move to the beginning of the sequence, then flip the entire sequence, making the largest element move to the end. This process is repeated until the entire sequence is sorted.\n\nPancake Sort is named after the process of flipping pancakes in a frying pan.",
    time: {
      avg: "O(n^2)",
      best: "O(n^2)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  ShellSort: {
    description:
      "Shell Sort is an in-place comparison-based sorting algorithm that generalizes insertion sort by allowing the exchange of items that are far apart. \n\nThe idea is to arrange the list of elements so that, starting anywhere, taking every h-th element produces a sorted list. The algorithm first sorts elements far apart from each other and successively reduces the interval between elements to be compared. This interval is called the gap. \n\nThe performance of Shell Sort depends on the gap sequence it uses. Shell's original sequence starts with a large gap, then reduces it by half each time, but other sequences can be used to improve performance.",
    time: {
      avg: "O(n log n) or O(n^1.5)",
      best: "O(n log n)",
      worst: "O(n^2)",
      space: "O(1)",
    },
  },
  RadixSort: {
    description:
      "Radix Sort is a non-comparison-based sorting algorithm that sorts integers by processing individual digits of the numbers from least significant digit (LSD) to most significant digit (MSD) or vice versa. It can be applied to integers represented in any positional numeral system. \n\nRadix Sort uses the concept of bucket sorting, where elements are grouped into buckets based on the value of the digit being processed. After sorting each digit, the elements are rearranged according to their bucket order. \n\nRadix Sort is often used for sorting strings, floating-point numbers, or other data types that can be decomposed into individual digits or characters.",
    time: {
      avg: "O(n * k)",
      best: "O(n * k)",
      worst: "O(n * k)",
      space: "O(n + k)",
    },
  },
};
