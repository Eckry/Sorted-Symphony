import { useRef } from "react";
import { resetColor, stop, swap } from "../helpers";
import { Block, Configuration } from "../types";

export const SelectionSort = () => {
  const isSortingRef = useRef(true);

  const stopSelectionSort = () => {
    isSortingRef.current = false;
  };

  const initSelectionSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
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

  return { stopSelectionSort, initSelectionSort };
};
