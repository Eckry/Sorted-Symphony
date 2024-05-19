import { BubbleSort, bubbleSortC } from "./algorithms/BubbleSort";
import { CombSort, combSortC } from "./algorithms/CombSort";
import { GnomeSort, gnomeSortC } from "./algorithms/GnomeSort";
import { HeapSort, heapSortC } from "./algorithms/HeapSort";
import { InsertionSort, insertionSortC } from "./algorithms/InsertionSort";
import { MergeSort, mergeSortC } from "./algorithms/MergeSort";
import { OddEvenSort, oddEvenSortC } from "./algorithms/OddEvenSort";
import { PancakeSort, pancakeSortC } from "./algorithms/PancakeSort";
import { QuickSort, quickSortC } from "./algorithms/QuickSort";
import { RadixSort, radixSortC } from "./algorithms/RadixSort";
import { SelectionSort, selectionSortC } from "./algorithms/SelectionSort";
import { ShakerSort, shakerSortC } from "./algorithms/ShakerSort";
import { ShellSort, shellSortC } from "./algorithms/ShellSort";

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
  GNOMESORT: "GnomeSort",
  ODDEVENSORT: "OddEvenSort",
  PANCAKESORT: "PancakeSort",
  SHELLSORT: "ShellSort",
  RADIXSORT: "RadixSort",
  COMBSORT: "CombSort",
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
  GnomeSort,
  OddEvenSort,
  PancakeSort,
  ShellSort,
  RadixSort,
  CombSort,
};

export const codeImports = {
  QuickSort: quickSortC,
  BubbleSort: bubbleSortC,
  InsertionSort: insertionSortC,
  SelectionSort: selectionSortC,
  MergeSort: mergeSortC,
  HeapSort: heapSortC,
  ShakerSort: shakerSortC,
  GnomeSort: gnomeSortC,
  OddEvenSort: oddEvenSortC,
  PancakeSort: pancakeSortC,
  ShellSort: shellSortC,
  RadixSort: radixSortC,
  CombSort: combSortC,
};
