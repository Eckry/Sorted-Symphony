import { BubbleSort, bubbleSortC } from "./algorithms/BubbleSort";
import { HeapSort, heapSortC } from "./algorithms/HeapSort";
import { InsertionSort, insertionSortC } from "./algorithms/InsertionSort";
import { MergeSort, mergeSortC } from "./algorithms/MergeSort";
import { QuickSort, quickSortC } from "./algorithms/QuickSort";
import { SelectionSort, selectionSortC } from "./algorithms/SelectionSort";
import { ShakerSort, shakerSortC } from "./algorithms/ShakerSort";
import { AudioFile } from "./types";

export const initialConfiguration = {
  velocity: 100,
  elements: 100,
};

export const colors = {
  DEFAULT: "var(--primary-brighty-color)",
  HIGHLIGHT: "var(--highlight-color)",
};

export const algorithms = {
  QUICKSORT: "QuickSort",
  MERGESORT: "MergeSort",
  BUBBLESORT: "BubbleSort",
  INSERTIONSORT: "InsertionSort",
  SELECTIONSORT: "SelectionSort",
  HEAPSORT: "HeapSort",
  SHAKERSORT: "ShakerSort",
} as const;

export const sortOptions = {
  RANDOM: "Random",
  REVERSED: "Reversed",
  NEARLY_SORTED: "Nearly sorted",
} as const;

export const languages = {
  "C++": "cpp",
  JavaScript: "javascript",
  Python: "python",
  Java: "java",
} as const;

export const audios: AudioFile[] = [
  "./DO.mp3",
  "./RE.mp3",
  "./MI.mp3",
  "./FA.mp3",
  "./SOL.mp3",
  "./LA.mp3",
];

export const initialBlocks = {
  Reversed: [
    { val: 30, color: colors.DEFAULT },
    { val: 29, color: colors.DEFAULT },
    { val: 28, color: colors.DEFAULT },
    { val: 27, color: colors.DEFAULT },
    { val: 26, color: colors.DEFAULT },
    { val: 25, color: colors.DEFAULT },
    { val: 24, color: colors.DEFAULT },
    { val: 23, color: colors.DEFAULT },
    { val: 22, color: colors.DEFAULT },
    { val: 21, color: colors.DEFAULT },
    { val: 20, color: colors.DEFAULT },
    { val: 19, color: colors.DEFAULT },
    { val: 18, color: colors.DEFAULT },
    { val: 17, color: colors.DEFAULT },
    { val: 16, color: colors.DEFAULT },
    { val: 15, color: colors.DEFAULT },
    { val: 14, color: colors.DEFAULT },
    { val: 13, color: colors.DEFAULT },
    { val: 12, color: colors.DEFAULT },
    { val: 11, color: colors.DEFAULT },
    { val: 10, color: colors.DEFAULT },
    { val: 9, color: colors.DEFAULT },
    { val: 8, color: colors.DEFAULT },
    { val: 7, color: colors.DEFAULT },
    { val: 6, color: colors.DEFAULT },
    { val: 5, color: colors.DEFAULT },
    { val: 4, color: colors.DEFAULT },
    { val: 3, color: colors.DEFAULT },
    { val: 2, color: colors.DEFAULT },
    { val: 1, color: colors.DEFAULT },
  ],
  Random: [
    { val: 21, color: colors.DEFAULT },
    { val: 1, color: colors.DEFAULT },
    { val: 20, color: colors.DEFAULT },
    { val: 16, color: colors.DEFAULT },
    { val: 15, color: colors.DEFAULT },
    { val: 30, color: colors.DEFAULT },
    { val: 7, color: colors.DEFAULT },
    { val: 6, color: colors.DEFAULT },
    { val: 18, color: colors.DEFAULT },
    { val: 3, color: colors.DEFAULT },
    { val: 28, color: colors.DEFAULT },
    { val: 26, color: colors.DEFAULT },
    { val: 10, color: colors.DEFAULT },
    { val: 14, color: colors.DEFAULT },
    { val: 9, color: colors.DEFAULT },
    { val: 8, color: colors.DEFAULT },
    { val: 27, color: colors.DEFAULT },
    { val: 25, color: colors.DEFAULT },
    { val: 17, color: colors.DEFAULT },
    { val: 4, color: colors.DEFAULT },
    { val: 19, color: colors.DEFAULT },
    { val: 29, color: colors.DEFAULT },
    { val: 12, color: colors.DEFAULT },
    { val: 2, color: colors.DEFAULT },
    { val: 11, color: colors.DEFAULT },
    { val: 22, color: colors.DEFAULT },
    { val: 24, color: colors.DEFAULT },
    { val: 5, color: colors.DEFAULT },
    { val: 13, color: colors.DEFAULT },
    { val: 23, color: colors.DEFAULT },
  ],
  "Nearly sorted": [
    { val: 16, color: colors.DEFAULT },
    { val: 2, color: colors.DEFAULT },
    { val: 3, color: colors.DEFAULT },
    { val: 30, color: colors.DEFAULT },
    { val: 5, color: colors.DEFAULT },
    { val: 6, color: colors.DEFAULT },
    { val: 26, color: colors.DEFAULT },
    { val: 8, color: colors.DEFAULT },
    { val: 10, color: colors.DEFAULT },
    { val: 1, color: colors.DEFAULT },
    { val: 11, color: colors.DEFAULT },
    { val: 12, color: colors.DEFAULT },
    { val: 28, color: colors.DEFAULT },
    { val: 14, color: colors.DEFAULT },
    { val: 15, color: colors.DEFAULT },
    { val: 9, color: colors.DEFAULT },
    { val: 17, color: colors.DEFAULT },
    { val: 18, color: colors.DEFAULT },
    { val: 4, color: colors.DEFAULT },
    { val: 20, color: colors.DEFAULT },
    { val: 21, color: colors.DEFAULT },
    { val: 24, color: colors.DEFAULT },
    { val: 23, color: colors.DEFAULT },
    { val: 22, color: colors.DEFAULT },
    { val: 7, color: colors.DEFAULT },
    { val: 25, color: colors.DEFAULT },
    { val: 27, color: colors.DEFAULT },
    { val: 19, color: colors.DEFAULT },
    { val: 29, color: colors.DEFAULT },
    { val: 13, color: colors.DEFAULT },
  ],
};

export const initImports = {
  QuickSort,
  BubbleSort,
  InsertionSort,
  SelectionSort,
  MergeSort,
  HeapSort,
  ShakerSort,
};

export const codeImports = {
  QuickSort: quickSortC,
  BubbleSort: bubbleSortC,
  InsertionSort: insertionSortC,
  SelectionSort: selectionSortC,
  MergeSort: mergeSortC,
  HeapSort: heapSortC,
  ShakerSort: shakerSortC,
};
