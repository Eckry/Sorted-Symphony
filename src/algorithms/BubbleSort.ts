import { useRef } from "react";
import { resetColor, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const BubbleSort = (comparison: boolean): AlgorithmFunction => {
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
    const len = blocks.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j + 1 < len - i; j++) {
        const { val: a } = blocks[j];
        const { val: b } = blocks[j + 1];
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (a > b) {
          await swap(j, j + 1, blocks, configuration.velocity, comparison);
          setBlocks([...blocks]);
        }
      }
    }
    await resetColor(blocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initBubbleSort, stopBubbleSort];
};
