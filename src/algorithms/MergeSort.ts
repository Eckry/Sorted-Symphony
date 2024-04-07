import { useRef } from "react";
import { insert, isSorted, resetColor, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const MergeSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopMergeSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initMergeSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    let prevMerge = structuredClone(blocks);
    async function merge(p: number, q: number, r: number) {
      const n1 = q - p + 1;
      const n2 = r - q;
      const L: number[] = Array(n1);
      const M: number[] = Array(n2);

      for (let i = 0; i < n1; i++) L[i] = blocks[p + i].val;
      for (let j = 0; j < n2; j++) M[j] = blocks[q + 1 + j].val;

      let i = 0;
      let j = 0;
      let k = p;

      while (i < n1 && j < n2) {
        if (!isSortingRef.current) return;
        if (L[i] <= M[j]) {
          await insert(blocks, L[i], k, configuration, comparison, setBlocks);
          i++;
        } else {
          await insert(blocks, M[j], k, configuration, comparison, setBlocks);
          j++;
        }
        k++;
      }

      while (i < n1) {
        if (!isSortingRef.current) return;
        await insert(blocks, L[i], k, configuration, comparison, setBlocks);
        i++;
        k++;
      }

      while (j < n2) {
        if (!isSortingRef.current) return;
        await insert(blocks, M[j], k, configuration, comparison, setBlocks);
        j++;
        k++;
      }
      if (!isSortingRef.current) return;
      prevMerge = structuredClone(blocks);
    }

    async function executeMergeSort(l: number, r: number) {
      if (!isSortingRef.current) return;
      if (l < r) {
        const m = l + Math.floor((r - l) / 2);
        await executeMergeSort(l, m);
        await executeMergeSort(m + 1, r);
        await merge(l, m, r);
      }
    }

    if (!isSorted(blocks)) await executeMergeSort(0, blocks.length - 1);

    if (!isSortingRef.current) {
      setBlocks(prevMerge);
      return stop(prevMerge, setBlocks);
    }

    await resetColor(blocks, setBlocks, configuration);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  const codes = {
    javascript: `function merge(arr, p, q, r) {
  const n1 = q - p + 1;
  const n2 = r - q;
  const L = new Array(n1);
  const M = new Array(n2);
    
  for (let i = 0; i < n1; i++) L[i] = arr[p + i];
  for (let j = 0; j < n2; j++) M[j] = arr[q + 1 + j];
    
  let i = 0;
  let j = 0;
  let k = p;
    
  while (i < n1 && j < n2) {
    if (L[i] <= M[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = M[j];
      j++;
    }
    k++;
  }
    
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
    
  while (j < n2) {
    arr[k] = M[j];
    j++;
    k++;
  }
}
    
function mergeSort(arr, l, r) {
  if (l < r) {
    const m = l + Math.floor((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    cpp: `void merge(int arr[], int p, int q, int r)
{
  int n1 = q - p + 1;
  int n2 = r - q;
  int L[n1];
  int M[n2];
    
  for (int i = 0; i < n1; i++) L[i] = arr[p + i];
  for (int j = 0; j < n2; j++) M[j] = arr[q + 1 + j];
    
  int i = 0;
  int j = 0;
  int k = p;
    
  while (i < n1 && j < n2)
  {
    if (L[i] <= M[j])
    {
      arr[k] = L[i];
      i++;
    }
    else
    {
      arr[k] = M[j];
      j++;
    }
    k++;
  }
    
  while (i < n1)
  {
    arr[k] = L[i];
    i++;
    k++;
  }
    
  while (j < n2)
  {
    arr[k] = M[j];
    j++;
    k++;
  }
}    

void mergeSort(int arr[], int l, int r)
{
  if (l < r)
  {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    python: `def merge(arr, p, q, r):
  n1 = q - p + 1
  n2 = r - q
  L = [0] * n1
  M = [0] * n2

  for i in range(n1):
    L[i] = arr[p + i]
  for j in range(n2):
    M[j] = arr[q + 1 + j]

  i = 0
  j = 0
  k = p

  while i < n1 and j < n2:
    if L[i] <= M[j]:
      arr[k] = L[i]
      i += 1
    else:
      arr[k] = M[j]
      j += 1
    k += 1

  while i < n1:
    arr[k] = L[i]
    i += 1
    k += 1

  while j < n2:
    arr[k] = M[j]
    j += 1
    k += 1


def mergeSort(arr, l, r):
  if l < r:
    m = l + (r - l) // 2
    mergeSort(arr, l, m)
    mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)
`,
    java: `public static void merge(int[] arr, int p, int q, int r) {
  int n1 = q - p + 1;
  int n2 = r - q;
  int[] L = new int[n1];
  int[] M = new int[n2];

  for (int i = 0; i < n1; i++) L[i] = arr[p + i];
  for (int j = 0; j < n2; j++) M[j] = arr[q + 1 + j];

  int i = 0, j = 0;
  int k = p;

  while (i < n1 && j < n2) {
    if (L[i] <= M[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = M[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = M[j];
    j++;
    k++;
  }
}

public static void mergeSort(int[] arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
  };
  return [initMergeSort, stopMergeSort, codes];
};
