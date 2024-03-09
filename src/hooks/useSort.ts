/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { algorithms } from "../consts";
import { useSelected } from "./useSelected";
import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import { BubbleSort } from "../algorithms/BubbleSort";
import { SelectionSort } from "../algorithms/SelectionSort";
import { QuickSort } from "../algorithms/QuickSort";
import { MergeSort } from "../algorithms/MergeSort";
import { InsertionSort } from "../algorithms/InsertionSort";
import { HeapSort } from "../algorithms/HeapSort";

const initialBlocks = [
  { val: 10, color: "white" },
  { val: 9, color: "white" },
  { val: 8, color: "white" },
  { val: 7, color: "white" },
  { val: 6, color: "white" },
  { val: 5, color: "white" },
  { val: 4, color: "white" },
  { val: 3, color: "white" },
  { val: 2, color: "white" },
  { val: 1, color: "white" },
];

const initialConfiguration = {
  velocity: 50,
  elements: 100,
};

export const useSort = () => {
  const { selected } = useSelected();
  const [blocks, setBlocks] = useState(initialBlocks);
  const isSortingRef = useRef(false);
  const [isSorting, setIsSorting] = useState(false);
  const [configuration, setConfiguration] = useState(initialConfiguration);

  const { initBubbleSort, stopBubbleSort } = BubbleSort();
  const { initSelectionSort, stopSelectionSort } = SelectionSort();
  const { initQuickSort, stopQuickSort } = QuickSort();
  const { initMergeSort, stopMergeSort } = MergeSort();
  const { initInsertionSort, stopInsertionSort } = InsertionSort();
  const { initHeapSort, stopHeapSort } = HeapSort();

  const changeIsSorting = () => {
    isSortingRef.current = !isSortingRef.current;
    setIsSorting((prevIsSorting) => !prevIsSorting);
  };

  const changeElements = ({ elements }: ConfigurationElements) => {
    const length = blocks.length;
    if (length === elements) return;
    if (length < elements) {
      const newElements: Block[] = [];
      for (let i = length; i < elements; i++) {
        newElements.push({ val: i + 1, color: "white" });
      }
      const newBlocks = [...blocks, ...newElements].sort(
        (a, b) => a.val - b.val
      );
      setBlocks(newBlocks);
      return;
    } else {
      const prevBlocks = [...blocks].sort((a, b) => a.val - b.val);
      const newBlocks = prevBlocks.slice(0, elements - 1);
      setBlocks(newBlocks);
    }
  };

  const changeVelocity = ({ velocity }: ConfigurationVelocity) => {
    setConfiguration((prevConfig) => {
      return { ...prevConfig, velocity: 100 - velocity };
    });
  };

  useEffect(() => {
    switch (selected) {
      case algorithms.BUBBLESORT:
        if (!isSorting) return stopBubbleSort();
        initBubbleSort(blocks, setBlocks, configuration, setIsSorting);
        break;
      case algorithms.SELECTIONSORT:
        if (!isSorting) return stopSelectionSort();
        initSelectionSort(blocks, setBlocks, configuration, setIsSorting);
        break;
      case algorithms.QUICKSORT:
        if (!isSorting) return stopQuickSort();
        initQuickSort(blocks, setBlocks, configuration, setIsSorting);
        break;
      case algorithms.MERGESORT:
        if (!isSorting) return stopMergeSort();
        initMergeSort(blocks, setBlocks, configuration, setIsSorting);
        break;
      case algorithms.INSERTIONSORT:
        if (!isSorting) return stopInsertionSort();
        initInsertionSort(blocks, setBlocks, configuration, setIsSorting);
        break;
      case algorithms.HEAPSORT:
        if (!isSorting) return stopHeapSort();
        initHeapSort(blocks, setBlocks, configuration, setIsSorting);
        break;
    }
  }, [isSorting]);

  return {
    blocks,
    setBlocks,
    changeIsSorting,
    isSorting,
    changeVelocity,
    changeElements,
  };
};
