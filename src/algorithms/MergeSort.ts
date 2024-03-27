import { useRef } from "react";
import { insert, isSorted, resetColor, stop } from "../helpers";
import { AlgorithmFunction, Block, Configuration } from "../types";

export const MergeSort = (): AlgorithmFunction => {
  const isSortingRef = useRef(true);

  const stopMergeSort = () => {
    isSortingRef.current = false;
  };

  const initMergeSort = async (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => {
    isSortingRef.current = true;
    let prevBlocks = structuredClone(blocks);
    let prevMerge = structuredClone(prevBlocks);
    async function merge(p: number, q: number, r: number) {
      const n1 = q - p + 1;
      const n2 = r - q;
      const L: number[] = Array(n1);
      const M: number[] = Array(n2);

      for (let i = 0; i < n1; i++) L[i] = prevBlocks[p + i].val;
      for (let j = 0; j < n2; j++) M[j] = prevBlocks[q + 1 + j].val;

      let i = 0;
      let j = 0;
      let k = p;

      while (i < n1 && j < n2) {
        if (!isSortingRef.current) return;
        if (L[i] <= M[j]) {
          prevBlocks = await insert(prevBlocks, L[i], k, configuration.velocity);
          i++;
        } else {
          prevBlocks = await insert(
            prevBlocks,
            M[j],
            k,
            configuration.velocity
          );
          setBlocks(prevBlocks);
          j++;
        }
        k++;
      }

      while (i < n1) {
        if (!isSortingRef.current) return;
        prevBlocks = await insert(prevBlocks, L[i], k, configuration.velocity);
        setBlocks(prevBlocks);
        i++;
        k++;
      }

      while (j < n2) {
        if (!isSortingRef.current) return;
        prevBlocks = await insert(prevBlocks, M[j], k, configuration.velocity);
        setBlocks(prevBlocks);
        j++;
        k++;
      }
      if (!isSortingRef.current) return;
      prevMerge = structuredClone(prevBlocks);
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

    if (!isSorted(prevBlocks)) await executeMergeSort(0, prevBlocks.length - 1);

    if (!isSortingRef.current) {
      setBlocks(prevMerge);
      return stop(prevMerge, setBlocks);
    }

    await resetColor(prevBlocks, setBlocks);
    isSortingRef.current = false;
    setIsSorting(false);
  };

  return [initMergeSort, stopMergeSort];
};
