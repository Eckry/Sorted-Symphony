import { useRef } from "react";
import { playFinish, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const stoogeSortC = {
  javascript: `let k;

if (arr[i] > arr[j]) 
  [arr[j], arr[i]] = [arr[i], arr[j]];

if ((i + 1) >= j) return;

k = Math.floor((j - i + 1) / 3);
stoogesort(arr, i, j - k);
stoogesort(arr, i + k, j);
stoogesort(arr, i, j - k);`,
  python: `if arr[i] > arr[j]:
  arr[j], arr[i] = arr[i], arr[j]
  
if (i + 1) >= j:
  return

k = (j - i + 1) // 3
stoogesort(arr, i, j - k)
stoogesort(arr, i + k, j)
stoogesort(arr, i, j - k)`,
  cpp: `int k;

if (arr[i] > arr[j])
{
  int temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

if ((i + 1) >= j) return;
k = (int)((j - i + 1) / 3);
stoogesort(arr, i, j - k);
stoogesort(arr, i + k, j);
stoogesort(arr, i, j - k);`,
  java: `int k;

if (arr[i] > arr[j]) {
  int temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

if ((i + 1) >= j) return;

k = (int)((j - i + 1) / 3);
stoogesort(arr, i, j - k);
stoogesort(arr, i + k, j);
stoogesort(arr, i, j - k);`,
};

export const StoogeSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopStoogeSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initStoogeSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    const len = blocks.length;

    async function stoogesort(l: number, h: number) {
      if (!isSortingRef.current) return;
      if (l >= h) return;

      if (blocks[l].val > blocks[h].val) {
        await swap(l, h, blocks, configuration, comparison, setBlocks);
      }

      if (h - l + 1 > 2) {
        const t = Math.floor((h - l + 1) / 3);
        await stoogesort(l, h - t);
        await stoogesort(l + t, h);
        await stoogesort(l, h - t);
      }
    }

    await stoogesort(0, len - 1);

    if (!isSortingRef.current) return stop(blocks, setBlocks);

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initStoogeSort, stopStoogeSort];
};
