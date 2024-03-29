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
    let prevStatus = structuredClone(blocks);
    for (let i = 1; i < blocks.length; i++) {
      prevStatus = structuredClone(blocks);
      const key = blocks[i].val;
      let j = i - 1;
      while (j >= 0 && key < blocks[j].val) {
        if (!isSortingRef.current) break;
        await insert(
          blocks,
          blocks[j].val,
          j + 1,
          configuration.velocity
        );
        setBlocks([...blocks]);
        j--;
      }

      if (!isSortingRef.current) break;
      await insert(blocks, key, j + 1, configuration.velocity);
      setBlocks([...blocks]);
    }

    if (!isSortingRef.current) {
      setBlocks(prevStatus);
      return stop(prevStatus, setBlocks);
    }

    await resetColor(blocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initInsertionSort, stopInsertionSort];
};
