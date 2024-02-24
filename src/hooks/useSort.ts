import { useEffect, useState } from "react";
import { algorithms } from "../consts";
import { useSelected } from "./useSelected";
import { Block } from "../types";

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
          if (idx === i) return { ...block, color: "blue" };
          return { ...block, color: "white" };
        });
        prevBlocks = [...newBlocks];
        setBlocks(newBlocks);
        await sleep(50);
      }
      prevBlocks[prevBlocks.length - 1] = {
        ...prevBlocks[prevBlocks.length - 1],
        color: "white",
      };
      setBlocks(prevBlocks);
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
