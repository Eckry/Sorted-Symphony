import { useRef } from "react";
import { playFinish, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const shakerSortC = {
  javascript: `let swapped = true;
let start = 0;
let end = n - 1;
  
  while(swapped){
  swapped = false;

  for(let i = start; i < end; i++){
    if(arr[i] > arr[i + 1]){
      swapped = true;
      [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]
    }
  }

  if(!swapped) break;
  swapped = false;

  end--;

  for(let i = end; i - 1 >= start; i--){
    if(arr[i] < arr[i - 1]){
      swapped = true;
      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
    }
  }

  start++;
}`,
  cpp: `bool swapped = true;
  int start = 0;
  int end = n - 1;

  while(swapped){
  swapped = false;

  for(int i = start; i < end; i++){
    if(arr[i] > arr[i + 1]){
      swapped true;

      int temp = arr[i + 1];
      arr[i + 1] = arr[i];
      arr[i] = temp;
    }
  }

  if(!swapped) break;
  swapped = false;

  end--;

  for(int i = end; i - 1 >= start; i++){
    if(arr[i] < arr[i - 1]){
      swapped = true;

      int temp = arr[i - 1];
      arr[i - 1] = arr[i];
      arr[i] = temp;
    }
  }

  start++;
}`,
  python: `swapped = True
start = 0
end = n - 1

  while swapped:
  swapped = False

  for i in range(start, end):
    if arr[i] > arr[i + 1]:
      swapped = True
      arr[i + 1], arr[i] = arr[i], arr[i + 1]

  if not swapped:
    break
  swapped = False

  end -= 1

  for i in range(end, start - 1, -1):
  if arr[i] < arr[i - 1]:
    swapped = True
    arr[i - 1], arr[i] = arr[i], arr[i - 1]

  start += 1`,
  java: `boolean swapped = true;
int start = 0;
int end = n - 1;
  
  while (swapped) {
  swapped = false;
    
  for (int i = start; i < end; i++) {
    if (arr[i] > arr[i + 1]) {
    swapped = true;
    
    int temp = arr[i + 1];
    arr[i + 1] = arr[i];
    arr[i] = temp;
    }
  }
    
  if (!swapped) break;
  swapped = false;
    
  end--;
    
  for (int i = end; i - 1 >= start; i--) {
    if (arr[i] < arr[i - 1]) {
      swapped = true;
    
      int temp = arr[i - 1];
      arr[i - 1] = arr[i];
      arr[i] = temp;
    }
  }
    
  start++;
}`,
};

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
          await swap(i, i + 1, blocks, configuration, comparison, setBlocks);
        }
      }

      if (!swapped) break;
      swapped = false;

      end--;

      for (let i = end; i - 1 >= start; i--) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        if (blocks[i].val < blocks[i - 1].val) {
          swapped = true;
          await swap(i, i - 1, blocks, configuration, comparison, setBlocks);
        }
      }

      start++;
    }
    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initShakerSort, stopShakerSort];
};
