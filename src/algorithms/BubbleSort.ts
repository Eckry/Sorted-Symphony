import { useRef } from "react";
import { playFinish, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const bubbleSortC = {
  javascript: `for(let i = 0; i < n; i++){
  for(let j = 0; j + 1 < n - i; j++){
    if(arr[j] > arr[j + 1]){
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
}`,
  python: `for i in range(n):
  for j in range(n - i - 1):
    if arr[j] > arr[j + 1]:
      arr[j], arr[j + 1] = arr[j + 1], arr[j]`,

  cpp: `for(int i = 0; i < n; i++){
  for(int j = 0; j + 1 < n - i; j++){
    if(arr[j] > arr[j + 1]){
      int temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}`,
  java: `int n = arr.length;
int temp = 0;

for(int i = 0; i < n; i++){
  for(int j = 0; j + 1 < n - i; j++){
    if(arr[j] > arr[j + 1]){
      temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}`,
};

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
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (blocks[j].val > blocks[j + 1].val) {
          await swap(j, j + 1, blocks, configuration, comparison, setBlocks);
        }
      }
    }
    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initBubbleSort, stopBubbleSort];
};
