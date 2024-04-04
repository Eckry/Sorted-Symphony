import { useRef } from "react";
import { isSorted, resetColor, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const HeapSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopHeapSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initHeapSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    async function heapify(n: number, i: number) {
      if (!isSortingRef.current) return stop(blocks, setBlocks);
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && blocks[left].val > blocks[largest].val) {
        largest = left;
      }

      if (right < n && blocks[right].val > blocks[largest].val) {
        largest = right;
      }

      if (largest != i) {
        await swap(i, largest, blocks, configuration.velocity, comparison);
        setBlocks([...blocks]);
        await heapify(n, largest);
      }
    }

    if (isSorted(blocks)) {
      await resetColor(blocks, setBlocks);
      isSortingRef.current = false;
      setIsSorting(false);
      return;
    }

    for (let i = Math.floor(blocks.length / 2) - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(blocks, setBlocks);
      await heapify(blocks.length, i);
    }

    for (let i = blocks.length - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(blocks, setBlocks);
      await swap(0, i, blocks, configuration.velocity, comparison);
      setBlocks([...blocks]);
      await heapify(i, 0);
    }

    await resetColor(blocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initHeapSort, stopHeapSort];
};
