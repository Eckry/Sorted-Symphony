import { useRef } from "react";
import { isSorted, playFinish, stop, swapAndPaintBoth } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const QuickSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopQuickSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initQuickSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    async function executeQuickSort(first: number, last: number) {
      const center = Math.floor((first + last) / 2);
      const pivot = blocks[center];
      let i = first;
      let j = last;

      while (i <= j) {
        while (blocks[i].val < pivot.val) i++;
        while (blocks[j].val > pivot.val) j--;
        if (!isSortingRef.current) return;
        if (i <= j) {
          await swapAndPaintBoth(
            i,
            j,
            blocks,
            configuration,
            comparison,
            setBlocks
          );
          i++;
          j--;
        }
      }

      if (first < j) await executeQuickSort(first, j);
      if (i < last) await executeQuickSort(i, last);
    }

    if (!isSorted(blocks)) await executeQuickSort(0, blocks.length - 1);
    if (!isSortingRef.current) return stop(blocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  const codes = {
    javascript: `function quickSort(arr, l, r) {
  let center = Math.floor((l + r) / 2);
  let i = l;
  let j = r;
  const pivot = arr[center];
      
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (pivot < arr[j]) j--;
    
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j--;
      i++;
    }
  }
    
  if (i < r) quickSort(arr, i, r);
  if (l < j) quickSort(arr, l, j);
}`,
    python: `def quickSort(arr, l, r):
  center = (l + r) // 2
  i = l
  j = r
  pivot = arr[center]

  while i <= j:
    while arr[i] < pivot:
      i += 1
    while pivot < arr[j]:
      j -= 1
    if i <= j:
      arr[i], arr[j] = arr[j], arr[i]
      j -= 1
      i += 1

  if i < r:
      quickSort(arr, i, r)
  if l < j:
      quickSort(arr, l, j)`,
    cpp: `void quickSort(int arr[], int l, int r)
{
  int center = (l + r) / 2;
  int i = l;
  int j = r;
  int pivot = arr[center];

  while (i <= j)
  {
    while (arr[i] < pivot) i++;
    while (pivot < arr[j]) j--;

    if (i <= j)
    {
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      j--;
      i++;
    }
  }
    
  if (i < r) quickSort(arr, i, r);
  if (l < j) quickSort(arr, l, j);
}`,
    java: `public static void quickSort(int[] arr, int l, int r) {
  int center = (l + r) / 2;
  int i = l;
  int j = r;
  int pivot = arr[center];
  
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (pivot < arr[j]) j--;
  
    if (i <= j) {
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      j--;
      i++;
    }
  }
  
  if (i < r) quickSort(arr, i, r);
  if (l < j) quickSort(arr, l, j);
}`,
  };

  return [initQuickSort, stopQuickSort, codes];
};
