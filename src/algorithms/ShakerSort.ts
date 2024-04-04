import { useRef } from "react";
import { resetColor, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const ShakerSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopShakerSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initShakerSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    let swapped = true;
    let start = 0;
    let end = blocks.length - 1;

    while (swapped) {
      swapped = false;

      for (let i = start; i < end; i++) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (blocks[i].val > blocks[i + 1].val) {
          swapped = true;
          await swap(i, i + 1, blocks, configuration.velocity, comparison);
          setBlocks([...blocks]);
        }
      }

      if (!swapped) break;
      swapped = false;

      end--;

      for (let i = end; i - 1 >= start; i--) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (blocks[i].val < blocks[i - 1].val) {
          swapped = true;
          await swap(i, i - 1, blocks, configuration.velocity, comparison);
          setBlocks([...blocks]);
        }
      }

      start++;
    }
    await resetColor(blocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initShakerSort, stopShakerSort];
};
