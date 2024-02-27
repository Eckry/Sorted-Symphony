import { Block } from "./types";

export const shuffle = (array: Block[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const lowShuffle = (array: Block[]) => {
  array.sort((a, b) => a.val - b.val);

  const increment = Math.floor(array.length / 3);

  for (let i = 0; i < array.length; i += increment) {
    const j = Math.floor(Math.random() * array.length);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array
};

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const swap = async (i: number, j: number, prevBlocks: Block[]) => {
  const newBlocks = prevBlocks.map((block, idx) => {
    if (idx === i) return { val: prevBlocks[j].val, color: "white" };
    if (idx === j) return { val: prevBlocks[i].val, color: "red" };
    return { ...block, color: "white" };
  });
  await sleep(10);
  return newBlocks;
};

export const resetColor = async (
  prevBlocks: Block[],
  setBlocks: (blocks: Block[]) => void
) => {
  for (let i = 0; i < prevBlocks.length; i++) {
    const newBlocks = prevBlocks.map((block, idx) => {
      if (idx === i) return { ...block, color: "goldenrod" };
      return { ...block, color: "white" };
    });
    prevBlocks = [...newBlocks];
    setBlocks(newBlocks);
    await sleep(10);
  }
  const newBlocks = prevBlocks.map((block) => {
    return { ...block, color: "white" };
  });
  setBlocks(newBlocks);
};
