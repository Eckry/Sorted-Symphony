import { useRef } from "react";
import { playFinish, swap, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const gnomeSortC = {
  javascript: `let pos = 1;

while (pos < n) {
  if (arr[pos] >= arr[pos - 1]) {
    pos++;
  } else {
    [arr[pos], arr[pos - 1]] = [arr[pos - 1], arr[pos]];
    if (pos > 1) pos--;
  }
}`,
  python: `pos = 1

while pos < n:
  if arr[pos] >= arr[pos - 1]:
    pos += 1
  else:
    arr[pos], arr[pos - 1] = arr[pos - 1], arr[pos]
    if pos > 1:
      pos -= 1`,
  cpp: `int pos = 1;

while(pos < n){
  if(arr[pos] >= arr[pos - 1])
  {
    pos++;
  }
  else
  {
    int temp = arr[pos];
    arr[pos] = arr[pos - 1];
    arr[pos - 1] = temp;
  
    if(pos > 1) pos--;
  }
}`,
  java: `int pos = 1;
  
while (pos < n) {
  if (arr[pos] >= arr[pos - 1]) {
    pos++;
  } else {
    int temp = arr[pos];
    arr[pos] = arr[pos - 1];
    arr[pos - 1] = temp;

    if (pos > 1) pos--;
  }
}`,
};

export const GnomeSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopGnomeSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initGnomeSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    const len = blocks.length;
    let pos = 1;
    while (pos < len) {
      if (!isSortingRef.current) return stop(blocks, setBlocks);
      if (blocks[pos].val >= blocks[pos - 1].val) {
        pos++;
      } else {
        await swap(pos, pos - 1, blocks, configuration, comparison, setBlocks);
        if (pos > 1) pos--;
      }
    }
    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initGnomeSort, stopGnomeSort];
};
