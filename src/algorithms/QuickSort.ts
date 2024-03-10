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
    let prevBlocks = structuredClone(blocks);
    async function executeQuickSort(first: number, last: number) {
      const center = Math.floor((first + last) / 2);
      const pivot = prevBlocks[center];
      let i = first;
      let j = last;

      do {
        while (prevBlocks[i].val < pivot.val) i++;
        while (prevBlocks[j].val > pivot.val) j--;
        if (!isSortingRef.current) return;
        if (i <= j) {
          prevBlocks = await swapAndPaintBoth(
            i,
            j,
            prevBlocks,
            configuration.velocity
          );
          setBlocks(prevBlocks);
          i++;
          j--;
        }
      } while (i <= j);

      if (first < j) await executeQuickSort(first, j);
      if (i < last) await executeQuickSort(i, last);
    }

    if (!isSorted(prevBlocks)) await executeQuickSort(0, prevBlocks.length - 1);
    if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initQuickSort, stopQuickSort];
};
