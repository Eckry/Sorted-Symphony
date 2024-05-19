import { useRef } from "react";
import { playFinish, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const combSortC = {
  javascript: `let sm;
const shrink = 1.3;
let gap = length;
let sorted = false;
  
while (!sorted) {
  gap = Math.floor(gap / shrink);

  if (gap <= 1) {
    sorted = true;
    gap = 1;
  }
  
  for (let i = 0; i < length - gap; i++) {
    sm = gap + i;
    if (arr[i] > arr[sm]) {
      [arr[i], arr[sm]] = [arr[sm], arr[i]];
      sorted = false;
    }
  }
}`,
  python: `sm = 0
shrink = 1.3
gap = length
sorted = False
  
while not sorted:
  gap /= shrink
  
  if gap <= 1:
    sorted = True
    gap = 1
  
  for i in range(length - int(gap)):
    sm = int(gap) + i
    if arr[i] > arr[sm]:
      arr[sm], arr[i] = arr[i], arr[sm]
      sorted = False`,
  cpp: `int sm;
float shrink = 1.3;
int gap = length;
int sorted = 0;

while (!sorted) {
  gap /= shrink;

  if (gap <= 1) {
    sorted = 1;
    gap = 1;
  }

  for (int i = 0; i < length - gap; i++) {
    sm = gap + i;
    if (arr[i] > arr[sm]) {
      int temp = arr[i];
      arr[i] = arr[sm];
      arr[sm] = temp;
      sorted = 0;
    }
  }
}`,
  java: `int sm;
float shrink = 1.3f;
int gap = length;
int sorted = 0;
  
while (sorted != 1) {
  gap /= shrink;
  
  if (gap <= 1) {
    sorted = 1;
    gap = 1;
  }
  
  for (int i = 0; i < length - gap; i++) {
    sm = gap + i;
    if (arr[i] > arr[sm]) {
      int temp = arr[i];
      arr[i] = arr[sm];
      arr[sm] = temp;
      sorted = 0;
    }
  }
}`,
};

export const CombSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopCombSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initCombSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    const len = blocks.length;

    const shrink = 1.3;
    let gap = len;
    let sorted = false;

    while (!sorted) {
      gap = Math.floor(gap / shrink);

      if (gap <= 1) {
        sorted = true;
        gap = 1;
      }

      for (let i = 0; i < len - gap; i++) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        const sm = gap + i;
        if (blocks[i].val > blocks[sm].val) {
          await swap(i, sm, blocks, configuration, comparison, setBlocks);
          sorted = false;
        }
      }
    }

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initCombSort, stopCombSort];
};
