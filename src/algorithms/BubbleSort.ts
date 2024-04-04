import { useRef } from "react";
import { resetColor, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const BubbleSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopBubbleSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
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
          await swap(j, j + 1, blocks, configuration, comparison);
          setBlocks([...blocks]);
        }
      }
    }
    await resetColor(blocks, setBlocks, configuration);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initBubbleSort, stopBubbleSort];
};
