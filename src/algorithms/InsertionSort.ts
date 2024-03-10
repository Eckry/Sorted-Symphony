import { useRef } from "react";
import { insert, resetColor, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const InsertionSort = (): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopInsertionSort = () => {
    isSortingRef.current = false;
  };

  const initInsertionSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
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

  return [initInsertionSort, stopInsertionSort];
};
