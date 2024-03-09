import { useRef } from "react";
import { isSorted, resetColor, stop, swap } from "../helpers";
import { Block, Configuration } from "../types";

export const HeapSort = () => {
  const isSortingRef = useRef(true);

  const stopHeapSort = () => {
    isSortingRef.current = false;
  };

  const initHeapSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    let prevBlocks = structuredClone(blocks);

    async function heapify(n: number, i: number) {
      if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && prevBlocks[left].val > prevBlocks[largest].val) {
        largest = left;
      }

      if (right < n && prevBlocks[right].val > prevBlocks[largest].val) {
        largest = right;
      }

      if (largest != i) {
        prevBlocks = await swap(i, largest, prevBlocks, configuration.velocity);
        setBlocks(prevBlocks);
        await heapify(n, largest);
      }
    }

    if (isSorted(prevBlocks)) {
      await resetColor(prevBlocks, setBlocks, configuration.velocity);
      isSortingRef.current = false;
      setIsSorting(false);
      return;
    }

    for (let i = Math.floor(prevBlocks.length / 2) - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
      await heapify(prevBlocks.length, i);
    }

    for (let i = prevBlocks.length - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(prevBlocks, setBlocks);
      prevBlocks = await swap(0, i, prevBlocks, configuration.velocity);
      setBlocks(prevBlocks);
      await heapify(i, 0);
    }

    await resetColor(prevBlocks, setBlocks, configuration.velocity);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return { stopHeapSort, initHeapSort };
};
