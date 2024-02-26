/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { algorithms } from "../consts";
import { useSelected } from "./useSelected";
import { Block } from "../types";

const initialBlocks = [
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

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const useSort = () => {
  const { selected } = useSelected();
  const [blocks, setBlocks] = useState(initialBlocks);

  useEffect(() => {
    async function swap(i: number, j: number, prevBlocks: Block[]) {
      const newBlocks = prevBlocks.map((block, idx) => {
        if (idx === i) return { val: prevBlocks[j].val, color: "white" };
        if (idx === j) return { val: prevBlocks[i].val, color: "red" };
        return { ...block, color: "white" };
      });
      await sleep(100);
      return newBlocks;
    }

    async function resetColor(prevBlocks: Block[]) {
      for (let i = 0; i < prevBlocks.length; i++) {
        const newBlocks = prevBlocks.map((block, idx) => {
          if (idx === i) return { ...block, color: "goldenrod" };
          return { ...block, color: "white" };
        });
        prevBlocks = [...newBlocks];
        setBlocks(newBlocks);
        await sleep(50);
      }
      const newBlocks = prevBlocks.map((block) => {
        return { ...block, color: "white" };
      });
      setBlocks(newBlocks);
    }

    async function bubbleSort() {
      let prevBlocks = structuredClone(blocks);
      for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j + 1 < blocks.length - i; j++) {
          const { val: a } = prevBlocks[j];
          const { val: b } = prevBlocks[j + 1];
          if (a > b) {
            prevBlocks = await swap(j, j + 1, prevBlocks);
            setBlocks(prevBlocks);
          }
        }
      }
      await resetColor(prevBlocks);
    }
    switch (selected) {
      case algorithms.BUBBLESORT:
        bubbleSort();
        break;
    }
  }, [selected]);

  return { blocks };
};
