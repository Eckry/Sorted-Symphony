import { useRef } from "react";
import { playFinish, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const SelectionSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopSelectionSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
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
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (blocks[min].val > blocks[j].val) {
          min = j;
        }
      }
      if (i !== min) {
        await swap(i, min, blocks, configuration, comparison, setBlocks);
      }
    }
    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  const codes = {
    javascript: `for(let i = 0; i < n; i++){
  let minIdx = i;

  for(let j = i + 1; j < n; j++){
    if(arr[minIdx] > arr[j]){
      minIdx = j;
    }
  }
  
  [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
}`,
    python: `for i in range(n):
  minIdx = i

  for j in range(i + 1, n):
    if arr[j] < arr[minIdx]:
      minIdx = j

  arr[i], arr[minIdx] = arr[minIdx], arr[i]`,

    cpp: `for(int i = 0; i < n; i++){
  int minIdx = i;

  for(int j = i + 1; j < n; j++){
    if(arr[j] < arr[minIdx]){
      minIdx = j;
    }
  }

  int temp = arr[minIdx];
  arr[minIdx] = arr[i];
  arr[i] = temp;
}`,
    java: `public static void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n; i++) {
    int minIdx = i;

    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    int temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
}`,
  };

  return [initSelectionSort, stopSelectionSort, codes];
};
