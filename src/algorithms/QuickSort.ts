import { useRef } from "react";
import { isSorted, resetColor, stop, swapAndPaintBoth } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const QuickSort = (): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopQuickSort = () => {
    isSortingRef.current = false;
  };

  const initQuickSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    async function executeQuickSort(first: number, last: number) {
      const center = Math.floor((first + last) / 2);
      const pivot = blocks[center];
      let i = first;
      let j = last;

      while (i <= j) {
        while (blocks[i].val < pivot.val) i++;
        while (blocks[j].val > pivot.val) j--;
        if (!isSortingRef.current) return;
        if (i <= j) {
          await swapAndPaintBoth(
            i,
            j,
            blocks,
            configuration.velocity
          );
          setBlocks([...blocks]);
          i++;
          j--;
        }
      }

      if (first < j) await executeQuickSort(first, j);
      if (i < last) await executeQuickSort(i, last);
    }

    if (!isSorted(blocks)) await executeQuickSort(0, blocks.length - 1);
    if (!isSortingRef.current) return stop(blocks, setBlocks);
    await resetColor(blocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initQuickSort, stopQuickSort];
};
