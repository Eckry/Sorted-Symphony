import { useRef } from "react";
import { playFinish, stop, swapAndPaintBoth } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const pancakeSortC = {
  javascript: `function flip (arr, k) {
  let left = 0;
  while (left < k) {
    [arr[k], arr[left]] = [arr[left], arr[k]]
    left++;
    k--;
  }
}
  
function findMax(arr, k) {
  let index = 0;
  for (let i = 0; i < k; i++) {
    if (arr[i] > arr[index]) 
      index = i;
  return index;
}
  
function pancakeSort(arr, n) {
  let n = arr.length;
  while (n > 1) {
    const maxdex = findMax(arr, n);
    if (maxdex !== n) {
      flip(arr, maxdex);
      flip(arr, n - 1);
    }
    n--;
  }
}`,
  python: `def flip(arr, k):
  left = 0
  while left < k:
    arr[k], arr[left] = arr[left], arr[k]
    left += 1
    k -= 1

def findMax(arr, k):
  index = 0
  for i in range(k):
    if arr[i] > arr[index]:
      index = i
  return index

def pancakeSort(arr):
  n = len(arr)
  while n > 1:
    maxdex = findMax(arr, n)
    if maxdex != n:
      flip(arr, maxdex)
      flip(arr, n - 1)
    n -= 1`,
  cpp: `void flip(int arr[], int k) {
  int left = 0;
  while (left < k) {
    int temp = arr[k];
    arr[k] = arr[left];
    arr[left] = temp;
    left++;
    k--;
  }
}
  
int findMax(int arr[], int k) {
  int index = 0;
  for (int i = 0; i < k; i++) 
    if (arr[i] > arr[index]) 
      index = i;
  
  return index;
}
  
void pancakeSort(int arr[], int n) {
  while (n > 1) {
    int maxdex = findMax(arr, n);
    if (maxdex != n) {
      flip(arr, maxdex);
      flip(arr, n - 1);
    }
    n--;
  }
}`,
  java: `static void flip(int[] arr, int k) {
  int left = 0;
  while (left < k) {
    int temp = arr[k];
    arr[k] = arr[left];
    arr[left] = temp;
    left++;
    k--;
  }
}

static int findMax(int[] arr, int k) {
  int index = 0;
  for (int i = 0; i < k; i++) 
    if (arr[i] > arr[index])
      index = i;
  
  return index;
}

static void pancakeSort(int[] arr) {
  int n = arr.length;
  while (n > 1) {
    int maxdex = findMax(arr, n);
    if (maxdex != n) {
      flip(arr, maxdex);
      flip(arr, n - 1);
    }
    n--;
  }
}`,
};

export const PancakeSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopPancakeSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initPancakeSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    let n = blocks.length;

    const findMax = (k: number) => {
      let index = 0;
      for (let i = 0; i < k; i++) {
        if (blocks[i].val > blocks[index].val) {
          index = i;
        }
      }
      return index;
    };

    const flip = async (k: number) => {
      let left = 0;
      while (left < k) {
        if (!isSortingRef.current) return;
        await swapAndPaintBoth(
          k,
          left,
          blocks,
          configuration,
          comparison,
          setBlocks
        );
        left++;
        k--;
      }
    };

    while (n > 1) {
      const maxdex = findMax(n);
      if (maxdex !== n) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        await flip(maxdex);
        await flip(n - 1);
      }
      n--;
    }

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initPancakeSort, stopPancakeSort];
};