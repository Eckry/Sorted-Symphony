import { useRef } from "react";
import { resetColor, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const BubbleSort = (): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopBubbleSort = () => {
    isSortingRef.current = false;
  };

  const initBubbleSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
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

  return [initBubbleSort, stopBubbleSort];
};
