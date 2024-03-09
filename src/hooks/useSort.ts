/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { algorithms } from "../consts";
import { useSelected } from "./useSelected";
import {
  insert,
  isSorted,
  resetColor,
  stop,
  swap,
  swapAndPaintBoth,
} from "../helpers";
import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";

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

  const bubbleSort = async () => {
    let prevBlocks = structuredClone(blocks);
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j + 1 < blocks.length - i; j++) {
        const { val: a } = prevBlocks[j];
        const { val: b } = prevBlocks[j + 1];
        if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
        if (a > b) {
          prevBlocks = await swap(j, j + 1, prevBlocks, configuration.velocity);
          setBlocks(prevBlocks);
        }
      }
    }
    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  const selectionSort = async () => {
    let prevBlocks = structuredClone(blocks);
    for (let i = 0; i < blocks.length; i++) {
      let min = i;
      for (let j = i + 1; j < blocks.length; j++) {
        const { val: a } = prevBlocks[min];
        const { val: b } = prevBlocks[j];
        if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
        if (a > b) {
          min = j;
        }
      }
      if (i !== min) {
        prevBlocks = await swap(i, min, prevBlocks, configuration.velocity);
        setBlocks(prevBlocks);
      }
    }
    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  const quickSort = async () => {
    let prevBlocks = structuredClone(blocks);
    async function executeQuickSort(first: number, last: number) {
      const center = Math.floor((first + last) / 2);
      const pivot = prevBlocks[center];
      let i = first;
      let j = last;

      do {
        while (prevBlocks[i].val < pivot.val) i++;
        while (prevBlocks[j].val > pivot.val) j--;
        if (!isSortingRef.current) return;
        if (i <= j) {
          prevBlocks = await swapAndPaintBoth(
            i,
            j,
            prevBlocks,
            configuration.velocity
          );
          setBlocks(prevBlocks);
          i++;
          j--;
        }
      } while (i <= j);

      if (first < j) await executeQuickSort(first, j);
      if (i < last) await executeQuickSort(i, last);
    }

    if (!isSorted(prevBlocks)) await executeQuickSort(0, prevBlocks.length - 1);
    if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  const mergeSort = async () => {
    let prevBlocks = structuredClone(blocks);
    let prevMerge = structuredClone(prevBlocks);
    async function merge(p: number, q: number, r: number) {
      const n1 = q - p + 1;
      const n2 = r - q;
      const L: number[] = Array(n1);
      const M: number[] = Array(n2);

      for (let i = 0; i < n1; i++) L[i] = prevBlocks[p + i].val;
      for (let j = 0; j < n2; j++) M[j] = prevBlocks[q + 1 + j].val;

      let i = 0;
      let j = 0;
      let k = p;

      while (i < n1 && j < n2) {
        if (!isSortingRef.current) return;
        prevBlocks = await insert(prevBlocks, L[i], k, configuration.velocity);
        if (L[i] <= M[j]) {
          setBlocks(prevBlocks);
          i++;
        } else {
          prevBlocks = await insert(
            prevBlocks,
            M[j],
            k,
            configuration.velocity
          );
          setBlocks(prevBlocks);
          j++;
        }
        k++;
      }

      while (i < n1) {
        if (!isSortingRef.current) return;
        prevBlocks = await insert(prevBlocks, L[i], k, configuration.velocity);
        setBlocks(prevBlocks);
        i++;
        k++;
      }

      while (j < n2) {
        if (!isSortingRef.current) return;
        prevBlocks = await insert(prevBlocks, M[j], k, configuration.velocity);
        setBlocks(prevBlocks);
        j++;
        k++;
      }
      if (!isSortingRef.current) return;
      prevMerge = structuredClone(prevBlocks);
    }

    async function executeMergeSort(l: number, r: number) {
      if (!isSortingRef.current) return;
      if (l < r) {
        const m = l + Math.floor((r - l) / 2);
        await executeMergeSort(l, m);
        await executeMergeSort(m + 1, r);
        await merge(l, m, r);
      }
    }

    if (!isSorted(prevBlocks)) await executeMergeSort(0, prevBlocks.length - 1);

    if (!isSortingRef.current) {
      setBlocks(prevMerge);
      return stop(prevMerge, setBlocks);
    }

    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  const insertionSort = async () => {
    let prevBlocks = structuredClone(blocks);
    let prevStatus = structuredClone(blocks);
    for (let i = 1; i < prevBlocks.length; i++) {
      prevStatus = structuredClone(prevBlocks);
      const key = prevBlocks[i].val;
      let j = i - 1;
      while (j >= 0 && key < prevBlocks[j].val) {
        if (!isSortingRef.current) break;
        prevBlocks = await insert(
          prevBlocks,
          prevBlocks[j].val,
          j + 1,
          configuration.velocity
        );
        setBlocks(prevBlocks);
        j--;
      }

      if (!isSortingRef.current) break;
      prevBlocks = await insert(prevBlocks, key, j + 1, configuration.velocity);
      setBlocks(prevBlocks);
    }

    if (!isSortingRef.current) {
      setBlocks(prevStatus);
      return stop(prevStatus, setBlocks);
    }

    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  const heapSort = async () => {
    let prevBlocks = structuredClone(blocks);

    async function heapify(n: number, i: number) {
      if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && prevBlocks[left].val > prevBlocks[largest].val) {
        largest = left;
      }

      if (right < n && prevBlocks[right].val > prevBlocks[largest].val) {
        largest = right;
      }

      if (largest != i) {
        prevBlocks = await swap(i, largest, prevBlocks, configuration.velocity);
        setBlocks(prevBlocks);
        await heapify(n, largest);
      }
    }

    if (isSorted(prevBlocks)) {
      await resetColor(prevBlocks, setBlocks, configuration.velocity);
      isSortingRef.current = false;
      setIsSorting(false);
      return;
    }

    for (let i = Math.floor(prevBlocks.length / 2) - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
      await heapify(prevBlocks.length, i);
    }

    for (let i = prevBlocks.length - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
      prevBlocks = await swap(0, i, prevBlocks, configuration.velocity);
      setBlocks(prevBlocks);
      await heapify(i, 0);
    }

    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  useEffect(() => {
    if (!isSortingRef.current) return;

    switch (selected) {
      case algorithms.BUBBLESORT:
        bubbleSort();
        break;
      case algorithms.SELECTIONSORT:
        selectionSort();
        break;
      case algorithms.QUICKSORT:
        quickSort();
        break;
      case algorithms.MERGESORT:
        mergeSort();
        break;
      case algorithms.INSERTIONSORT:
        insertionSort();
        break;
      case algorithms.HEAPSORT:
        heapSort();
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
