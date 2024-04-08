import { useRef } from "react";
import { insert, playFinish, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const insertionSortC = {
  javascript: `for (let i = 1; i < n; i++) {
  const  key = arr[i];
  let j = i - 1;

  while (j >= 0 && key < arr[j]) {
    arr[j + 1] = arr[j];
    j--;
  }

  arr[j + 1] = key;
}`,
  cpp: `for (int i = 1; i < n; i++)
{
  int key = arr[i];
  int j = i - 1;

  while (j >= 0 && key < arr[j])
  {
    arr[j + 1] = arr[j];
    j--;
  }

  arr[j + 1] = key;
}`,
  python: `for i in range(1, n):
  key = arr[i]
  j = i - 1

  while j >= 0 and key < arr[j]:
    arr[j + 1] = arr[j]
    j -= 1

  arr[j + 1] = key`,
  java: `public static void insertionSort(int[] arr) {
  int n = arr.length;
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
  
    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
  
    arr[j + 1] = key;
  }
}`,
};

export const InsertionSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopInsertionSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initInsertionSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    let prevStatus = structuredClone(blocks);
    for (let i = 1; i < blocks.length; i++) {
      prevStatus = structuredClone(blocks);
      const key = blocks[i].val;
      let j = i - 1;
      while (j >= 0 && key < blocks[j].val) {
        if (!isSortingRef.current) break;
        await insert(
          blocks,
          blocks[j].val,
          j + 1,
          configuration,
          comparison,
          setBlocks
        );
        j--;
      }

      if (!isSortingRef.current) break;
      await insert(blocks, key, j + 1, configuration, comparison, setBlocks);
    }

    if (!isSortingRef.current) {
      setBlocks(prevStatus);
      return stop(prevStatus, setBlocks);
    }

    playFinish(configuration.volume);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initInsertionSort, stopInsertionSort];
};
