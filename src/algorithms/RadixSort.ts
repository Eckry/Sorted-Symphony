import { useRef } from "react";
import { play, playFinish, sleep, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";
import { colors } from "../consts";

export const radixSortC = {
  javascript: `function getMax(a) {
  let max = a[0];
  for (let i = 1; i < a.length; i++)
    if (a[i] > max) max = a[i];
  return max;
}
  
function radixSort(a) {
  let bucket = new Array(10).fill().map(() => new Array(10));
  let bucket_cnt = new Array(10).fill(0);
  let NOP = 0;
  let divisor = 1;
  let lar;
    
  lar = getMax(a);
    
  while (lar > 0) {
    NOP++;
    lar = Math.floor(lar / 10);
  }
    
  for (let pass = 0; pass < NOP; pass++) {
    for (let i = 0; i < 10; i++) bucket_cnt[i] = 0;
    for (let i = 0; i < a.length; i++) {
      let r = Math.floor((a[i] / divisor) % 10);
      bucket[r][bucket_cnt[r]] = a[i];
      bucket_cnt[r] += 1;
    }
    let i = 0;
    for (let k = 0; k < 10; k++) {
      for (let j = 0; j < bucket_cnt[k]; j++) {
        a[i] = bucket[k][j];
        i++;
      }
    }
    divisor *= 10;
  }
}`,
  python: `def get_max(a):
  max_val = a[0]
  for i in range(1, len(a)):
    if a[i] > max_val:
      max_val = a[i]
  return max_val

def radix_sort(a):
  bucket = [[0 for _ in range(10)] for _ in range(10)]
  bucket_cnt = [0] * 10
  NOP = 0
  divisor = 1
  lar = get_max(a)
  
  while lar > 0:
    NOP += 1
    lar //= 10

  for _ in range(NOP):
    for i in range(10):
      bucket_cnt[i] = 0
    for i in range(len(a)):
      r = (a[i] // divisor) % 10
      bucket[r][bucket_cnt[r]] = a[i]
      bucket_cnt[r] += 1
    i = 0
    for k in range(10):
      for j in range(bucket_cnt[k]):
        a[i] = bucket[k][j]
        i += 1
    divisor *= 10
`,
  cpp: `int getMax (int a[], int n){
  int max = a[0];
  for (int i = 1; i < n; i++)
    if (a[i] > max) max = a[i];
  return max;
}
 
void radixSort (int a[], int n){
  int bucket[10][10], bucket_cnt[10];
  int i, j, k, r, NOP = 0, divisor = 1, lar, pass;
  lar = getMax (a, n);
  
  while (lar > 0) {
    NOP++;
    lar /= 10;
  }

  for (pass = 0; pass < NOP; pass++) {
    for (i = 0; i < 10; i++) bucket_cnt[i] = 0;
    for (i = 0; i < n; i++) {
      r = (a[i] / divisor) % 10;
      bucket[r][bucket_cnt[r]] = a[i];
      bucket_cnt[r] += 1;
    }
    i = 0;
    for (k = 0; k < 10; k++){
      for (j = 0; j < bucket_cnt[k]; j++){
        a[i] = bucket[k][j];
        i++;
      }
    }
    divisor *= 10;
  }
}`,
  java: `static int getMax(int[] a, int n) {
  int max = a[0];
  for (int i = 1; i < n; i++)
    if (a[i] > max) max = a[i];
  return max;
}

static void radixSort(int[] a, int n) {
  int[][] bucket = new int[10][10];
  int[] bucket_cnt = new int[10];
  int i, j, k, r, NOP = 0, divisor = 1, lar, pass;
  lar = getMax(a, n);

  while (lar > 0) {
    NOP++;
    lar /= 10;
  }

  for (pass = 0; pass < NOP; pass++) {
    for (i = 0; i < 10; i++) bucket_cnt[i] = 0;
    for (i = 0; i < n; i++) {
      r = (a[i] / divisor) % 10;
      bucket[r][bucket_cnt[r]] = a[i];
      bucket_cnt[r] += 1;
    }
    i = 0;
    for (k = 0; k < 10; k++) {
      for (j = 0; j < bucket_cnt[k]; j++) {
        a[i] = bucket[k][j];
        i++;
      }
    }
    divisor *= 10;
  }
}`,
};

export const RadixSort = (
  comparison: boolean,
  count: React.MutableRefObject<number> | null
): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopRadixSort = () => {
    if (count) count.current = count.current === 0 ? 0 : count.current - 1;
    isSortingRef.current = false;
  };

  const initRadixSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    const len = blocks.length;

    function getMax() {
      let max = 0;
      for (const num of blocks) {
        if (max < num.val.toString().length) {
          max = num.val.toString().length;
        }
      }
      return max;
    }

    function getPosition(num: number, place: number) {
      return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    }

    const max = getMax();

    for (let i = 0; i < max; i++) {
      const buckets: Block[][] = Array.from({ length: 10 }, () => []);
      for (let j = 0; j < len; j++) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        buckets[getPosition(blocks[j].val, i)].push(blocks[j]);
      }
      const newBlocks: Block[] = [];
      for (const bucket of buckets) {
        newBlocks.push(...bucket);
      }

      for (let i = 0; i < len; i++) {
        if (!isSortingRef.current) return stop(blocks, setBlocks);
        blocks[i] = { ...blocks[i], color: colors.HIGHLIGHT };
        setBlocks([...newBlocks.slice(0, i), ...blocks.slice(i, len)]);
        await sleep(configuration.velocity);
        play(blocks[i].val, blocks.length, comparison, configuration.volume);
        blocks[i] = { ...blocks[i], color: colors.DEFAULT };
      }

      setBlocks(newBlocks);
      blocks = newBlocks;
    }

    isSortingRef.current = false;
    setIsSorting(false);
    playFinish(configuration.volume);
  };

  return [initRadixSort, stopRadixSort];
};
