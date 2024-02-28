/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { algorithms } from "../consts";
import { useSelected } from "./useSelected";
import { resetColor, swap } from "../helpers";
import { Block } from "../types";

const initialBlocks = [
  { val: 37, color: "white" },
  { val: 36, color: "white" },
  { val: 35, color: "white" },
  { val: 34, color: "white" },
  { val: 33, color: "white" },
  { val: 32, color: "white" },
  { val: 31, color: "white" },
  { val: 30, color: "white" },
  { val: 29, color: "white" },
  { val: 28, color: "white" },
  { val: 27, color: "white" },
  { val: 26, color: "white" },
  { val: 25, color: "white" },
  { val: 24, color: "white" },
  { val: 22, color: "white" },
  { val: 21, color: "white" },
  { val: 20, color: "white" },
  { val: 19, color: "white" },
  { val: 18, color: "white" },
  { val: 17, color: "white" },
  { val: 16, color: "white" },
  { val: 15, color: "white" },
  { val: 14, color: "white" },
  { val: 13, color: "white" },
  { val: 12, color: "white" },
  { val: 11, color: "white" },
  { val: 10, color: "white" },
  { val: 9, color: "white" },
  { val: 8, color: "white" },
  { val: 7, color: "white" },
  { val: 6, color: "white" },
  { val: 23, color: "white" },
  { val: 5, color: "white" },
  { val: 4, color: "white" },
  { val: 3, color: "white" },
  { val: 2, color: "white" },
  { val: 1, color: "white" },
];

export const useSort = () => {
  const { selected } = useSelected();
  const [blocks, setBlocks] = useState(initialBlocks);
  const isSortingRef = useRef(false);
  const [isSorting, setIsSorting] = useState(false);

  const changeIsSorting = () => {
    isSortingRef.current = !isSortingRef.current;
    setIsSorting((prevIsSorting) => !prevIsSorting);
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
            prevBlocks = await swap(j, j + 1, prevBlocks, 10);
            setBlocks(prevBlocks);
          }
        }
      }
      await resetColor(prevBlocks, setBlocks, 10);
      isSortingRef.current = false;
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
          prevBlocks = await swap(i, min, prevBlocks, 50);
          setBlocks(prevBlocks);
        }
      }
      await resetColor(prevBlocks, setBlocks, 10);
      isSortingRef.current = false;
    }

    switch (selected) {
      case algorithms.BUBBLESORT:
        bubbleSort();
        break;
      case algorithms.SELECTIONSORT:
        selectionSort();
        break;
    }
  }, [isSorting]);

  return { blocks, setBlocks, changeIsSorting };
};
