/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { algorithms } from "../consts";
import { useSelected } from "./useSelected";
import { isSorted, resetColor, swap, swapAndPaintBoth } from "../helpers";
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

  useEffect(() => {
    function stop(prevBlocks: Block[]) {
      const newBlocks = prevBlocks.map((block) => {
        return { ...block, color: "white" };
      });
      setBlocks(newBlocks);
      return;
    }

    if (!isSortingRef.current) return;
    async function bubbleSort() {
      let prevBlocks = structuredClone(blocks);
      for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j + 1 < blocks.length - i; j++) {
          const { val: a } = prevBlocks[j];
          const { val: b } = prevBlocks[j + 1];
          if (!isSortingRef.current) return stop(prevBlocks);
          if (a > b) {
            prevBlocks = await swap(
              j,
              j + 1,
              prevBlocks,
              configuration.velocity
            );
            setBlocks(prevBlocks);
          }
        }
      }
      await resetColor(prevBlocks, setBlocks, configuration.velocity);
      isSortingRef.current = false;
      setIsSorting(false);
    }

    async function selectionSort() {
      let prevBlocks = structuredClone(blocks);
      for (let i = 0; i < blocks.length; i++) {
        let min = i;
        for (let j = i + 1; j < blocks.length; j++) {
          const { val: a } = prevBlocks[min];
          const { val: b } = prevBlocks[j];
          if (!isSortingRef.current) return stop(prevBlocks);
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
      setIsSorting(false);
      isSortingRef.current = false;
    }

    async function quickSort() {
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

      if(!isSorted(prevBlocks)) await executeQuickSort(0, prevBlocks.length - 1);
      if (!isSortingRef.current) return stop(prevBlocks);
      await resetColor(prevBlocks, setBlocks, configuration.velocity);
      setIsSorting(false);
      isSortingRef.current = false;
    }

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
