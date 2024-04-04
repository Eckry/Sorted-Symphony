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
          await insert(blocks, L[i], k, configuration, comparison);
          setBlocks([...blocks]);
          i++;
        } else {
          await insert(blocks, M[j], k, configuration, comparison);
          setBlocks([...blocks]);
          j++;
        }
        k++;
      }

      while (i < n1) {
        if (!isSortingRef.current) return;
        await insert(blocks, L[i], k, configuration, comparison);
        setBlocks([...blocks]);
        i++;
        k++;
      }

      while (j < n2) {
        if (!isSortingRef.current) return;
        await insert(blocks, M[j], k, configuration, comparison);
        setBlocks([...blocks]);
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

  return [initMergeSort, stopMergeSort];
};
