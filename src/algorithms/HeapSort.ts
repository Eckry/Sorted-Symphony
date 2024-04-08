import { useRef } from "react";
import { isSorted, playFinish, stop, swap } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const heapSortC = {
  javascript: `function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    heapify(arr, n, largest);
  }
}

function heapSort(arr, n) {
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i >= 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]];

    heapify(arr, i, 0);
  }
}`,
  cpp: `void heapify(int arr[], int n, int i)
{
  int largest = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest != i)
  {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n)
{
  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
  for (int i = n - 1; i >= 0; i--)
  {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }
}`,
  python: `def heapify(arr, n, i):
  largest = i
  left = 2 * i + 1
  right = 2 * i + 2

  if left < n and arr[left] > arr[largest]:
    largest = left
  if right < n and arr[right] > arr[largest]:
    largest = right

  if largest != i:
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)

def heapSort(arr, n):
  for i in range(n // 2 - 1, -1, -1):
    heapify(arr, n, i)
  for i in range(n - 1, 0, -1):
    arr[i], arr[0] = arr[0], arr[i]
    heapify(arr, i, 0)
`,
  java: `public static void heapify(int[] arr, int n, int i) {
  int largest = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    heapify(arr, n, largest);
  }
}

public static void heapSort(int[] arr) {
  int n = arr.length;

  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);

  for (int i = n - 1; i >= 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }
}`,
};

export const HeapSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopHeapSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initHeapSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    async function heapify(n: number, i: number) {
      if (!isSortingRef.current) return stop(blocks, setBlocks);
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && blocks[left].val > blocks[largest].val) {
        largest = left;
      }

      if (right < n && blocks[right].val > blocks[largest].val) {
        largest = right;
      }

      if (largest != i) {
        await swap(i, largest, blocks, configuration, comparison, setBlocks);
        await heapify(n, largest);
      }
    }

    if (isSorted(blocks)) {
      isSortingRef.current = false;
      setIsSorting(false);
      playFinish(configuration.volume);
      return;
    }

    for (let i = Math.floor(blocks.length / 2) - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(blocks, setBlocks);
      await heapify(blocks.length, i);
    }

    for (let i = blocks.length - 1; i >= 0; i--) {
      if (!isSortingRef.current) return stop(blocks, setBlocks);
      await swap(0, i, blocks, configuration, comparison, setBlocks);
      await heapify(i, 0);
    }

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initHeapSort, stopHeapSort];
};
