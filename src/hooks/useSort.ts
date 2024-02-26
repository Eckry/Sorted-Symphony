/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { algorithms } from "../consts";
import { useSelected } from "./useSelected";
import { resetColor, swap } from "../helpers";

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

export const useSort = () => {
  const { selected } = useSelected();
  const [blocks, setBlocks] = useState(initialBlocks);

  useEffect(() => {
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
      await resetColor(prevBlocks, setBlocks);
    }
    
    switch (selected) {
      case algorithms.BUBBLESORT:
        bubbleSort();
        break;
    }
  }, [selected]);

  return { blocks, setBlocks };
};
