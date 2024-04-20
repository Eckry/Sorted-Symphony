import { useRef } from "react";
import { playFinish, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const oddEvenSortC = {
  javascript: `let sorted = false;
while (!sorted) {
  sorted = true;
  for (let i = 1; i < n - 1; i += 2) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      sorted = false;
     }
  }

  for (let i = 0; i < n - 1; i += 2) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      sorted = false;
    }
  }
}`,
  python: `sorted = False
while not sorted:
  sorted = True
  for i in range(1, n - 1, 2):
    if arr[i] > arr[i + 1]:
      arr[i], arr[i + 1] = arr[i + 1], arr[i]
      sorted = False

  for i in range(0, n - 1, 2):
    if arr[i] > arr[i + 1]:
      arr[i], arr[i + 1] = arr[i + 1], arr[i]
      sorted = False`,
  cpp: `bool sorted = false;
while (!sorted) 
{
  sorted = true;
  for (int i = 1; i < n - 1; i += 2) 
  {
    if (arr[i] > arr[i + 1]) 
    {
      int temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      sorted = false;
    }
  }

  for (int i = 0; i < n - 1; i += 2) 
  {
    if (arr[i] > arr[i + 1]) 
    {
      int temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      sorted = false;
    }
  }
}`,
  java: `boolean sorted = false;
while (!sorted) {
  sorted = true;
  for (int i = 1; i < n - 1; i += 2) {
    if (arr[i] > arr[i + 1]) {
      int temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      sorted = false;
    }
  }

  for (int i = 0; i < n - 1; i += 2) {
    if (arr[i] > arr[i + 1]) {
      int temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
      sorted = false;
    }
  }
}`,
};

export const OddEvenSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopOddEvenSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initOddEvenSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    const len = blocks.length;

    let sorted = false;
    while (!sorted) {
      sorted = true;
      for (let i = 1; i < len - 1; i += 2) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (blocks[i].val > blocks[i + 1].val) {
          await swap(i, i + 1, blocks, configuration, comparison, setBlocks);
          sorted = false;
        }
      }
      for (let i = 0; i < len - 1; i += 2) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (blocks[i].val > blocks[i + 1].val) {
          await swap(i, i + 1, blocks, configuration, comparison, setBlocks);
          sorted = false;
        }
      }
    }

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initOddEvenSort, stopOddEvenSort];
};
