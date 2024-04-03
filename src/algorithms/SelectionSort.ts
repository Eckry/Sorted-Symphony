import { useRef } from "react";
import { resetColor, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const SelectionSort = (comparison: boolean): AlgorithmFunction => {
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
    for (let i = 0; i < blocks.length; i++) {
      let min = i;
      for (let j = i + 1; j < blocks.length; j++) {
        const { val: a } = blocks[min];
        const { val: b } = blocks[j];
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (a > b) {
          min = j;
        }
      }
      if (i !== min) {
        await swap(i, min, blocks, configuration.velocity, comparison);
        setBlocks([...blocks]);
      }
    }
    await resetColor(blocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initSelectionSort, stopSelectionSort];
};
