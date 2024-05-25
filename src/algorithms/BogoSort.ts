import { useRef } from "react";
import { isSorted, play, playFinish, shuffle, sleep, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const bogoSortC = {
  javascript: `function isSorted(arr) {
  for (let i = 0; i + 1 < arr.length; i++) 
    if (arr[i + 1] < arr[i]) return false;
  
  return true;
}
  
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
}
  
function bogosort(arr) {
  while (!isSorted(arr)) {
    shuffle(arr);
  }
}`,
  python: `import random

def is_sorted(arr):
    for i in range(len(arr) - 1):
        if arr[i + 1] < arr[i]:
            return False
    return True

def shuffle(arr):
    size = len(arr)
    for i in range(size):
        random_index = random.randint(0, size - 1)
        arr[i], arr[random_index] = arr[random_index], arr[i]

def bogosort(arr):
    while not is_sorted(arr):
        shuffle(arr)`,
  cpp: `void swap(int *i, int *yp) 
{
  int temp = *i;
  *i = *j;
  *j = temp;
}

bool isSorted(const int arr[], int size) 
{
  for (int i = 0; i + 1 < size; i++) 
  {
    if (arr[i + 1] < arr[i]) return false; 
  }
  return true;
}

void shuffle(int arr[], int size) 
{
  for (int i = 0; i < size; ++i) 
  {
    int randomIndex = rand() % size;
    swap(arr[i], arr[randomIndex]);
  }
}

void bogosort(int arr[], int size) 
{
  while (!isSorted(arr, size)) 
  {
    shuffle(arr, size);
  }
}`,
  java: `import java.util.Random;

static void swap(int[] arr, int i, int j) {
  int temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

static boolean isSorted(int[] arr) {
  for (int i = 0; i + 1 < arr.length; i++) {
    if (arr[i + 1] < arr[i]) return false;
  }
  return true;
}

static void shuffle(int[] arr) {
  Random rand = new Random();
  int size = arr.length;
  for (int i = 0; i < size; ++i) {
    int randomIndex = rand.nextInt(size);
    swap(arr, i, randomIndex);
  }
}

static void bogosort(int[] arr) {
  while (!isSorted(arr)) {
    shuffle(arr);
  }
}`,
};

export const BogoSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopBogoSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initBogoSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;

    async function bogoSort() {
      let sorted = false;
      while (!sorted) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        const newBlocks = shuffle(blocks);
        sorted = isSorted(newBlocks);
        await sleep(configuration.velocity);
        play(
          blocks[Math.floor(Math.random() * (blocks.length - 1))].val,
          blocks.length,
          comparison,
          configuration.volume
        );
        setBlocks(newBlocks);
      }
    }

    await bogoSort();

    if (!isSorted(blocks)) return;

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initBogoSort, stopBogoSort];
};
