import { useRef } from "react";
import { insert, playFinish, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const shellSortC = {
  javascript: `for (let i = Math.floor(num / 2); i > 0; i = Math.floor(i / 2)) {
  for (let j = i; j < num; j++) {
    for (let k = j - i; k >= 0; k -= i) {
      if (arr[k + i] >= arr[k]) break;
      else [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]];
    }
  }
}`,
  python: `i = num // 2
while i > 0:
  for j in range(i, num):
    k = j - i
    while k >= 0:
      if arr[k + i] >= arr[k]:
        break
      else:
        arr[k], arr[k + 1] = arr[k + 1], arr[k]
      k -= i
  i //= 2`,
  cpp: `for (int i = num / 2; i > 0; i /= 2) {
  for (int j = i; j < num; j++) {
    for (int k = j - i; k >= 0; k -= i) {
      if (arr[k + i] >= arr[k]) break;
      else {
        int temp = arr[k];
        arr[k] = arr[k + i];
        arr[k + i] = tmp;
      }
    }
  }
}`,
  java: `for (int i = num / 2; i > 0; i /= 2) {
  for (int j = i; j < num; j++) {
    for (int k = j - i; k >= 0; k -= i) {
      if (arr[k + i] >= arr[k]) break;
      else {
        int temp = arr[k];
        arr[k] = arr[k + i];
        arr[k + i] = temp;
      }
    }
  }
}`,
};

export const ShellSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopShellSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initShellSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    const len = blocks.length;

    for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < len; i += 1) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        const temp = blocks[i].val;

        let j;
        for (j = i; j >= gap && blocks[j - gap].val > temp; j -= gap) {
          await insert(
            blocks,
            blocks[j - gap].val,
            j,
            configuration,
            comparison,
            setBlocks
          );
        }
        await insert(blocks, temp, j, configuration, comparison, setBlocks);
      }
    }

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initShellSort, stopShellSort];
};
