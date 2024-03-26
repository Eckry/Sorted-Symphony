import { Block } from "./types";
import { audios } from "./consts";

const play = (pitch: number, length: number) => {
  const audioIndex = Math.floor((pitch / length) * 5);
  const path = audios[audioIndex];
  const audioClone = new Audio(path);
  if (audioClone instanceof HTMLAudioElement) {
    audioClone.volume = 0.1;
    audioClone.play();
  }
};

export const shuffle = (array: Block[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const lowShuffle = (array: Block[]) => {
  const newArray = [...array];
  newArray.sort((a, b) => a.val - b.val);

  const increment = Math.floor(newArray.length / (newArray.length / 3));

  for (let i = 0; i < newArray.length; i += increment) {
    const j = Math.floor(Math.random() * newArray.length);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const insert = async (
  prevBlocks: Block[],
  numberToInsert: number,
  i: number,
  delay: number
) => {
  const newBlocks = prevBlocks.map((block) => {
    return { ...block, color: "white" };
  });

  newBlocks[i].val = numberToInsert;
  newBlocks[i].color = "red";

  await sleep(delay);
  play(numberToInsert, newBlocks.length);
  return newBlocks;
};

export const swap = async (
  i: number,
  j: number,
  prevBlocks: Block[],
  delay: number
) => {
  const blocks = prevBlocks.map((block) => {
    return { ...block, color: "white" };
  });

  const temp = { ...blocks[i], color: "red" };
  blocks[i] = { ...blocks[j], color: "white" };
  blocks[j] = temp;
  await sleep(delay);
  play(blocks[i].val, blocks.length);
  return blocks;
};

export const swapAndPaintBoth = async (
  i: number,
  j: number,
  prevBlocks: Block[],
  delay: number
) => {
  const blocks = prevBlocks.map((block) => {
    return { ...block, color: "white" };
  });

  const temp = { ...blocks[i], color: "red" };
  blocks[i] = { ...blocks[j], color: "red" };
  blocks[j] = temp;
  await sleep(delay);
  play(blocks[j].val, blocks.length);
  return blocks;
};

export const resetColor = async (
  prevBlocks: Block[],
  setBlocks: (blocks: Block[]) => void,
  delay: number
) => {
  for (let i = 0; i < prevBlocks.length; i++) {
    const newBlocks = prevBlocks.map((block, idx) => {
      if (idx === i) return { ...block, color: "goldenrod" };
      return { ...block, color: "white" };
    });
    prevBlocks = [...newBlocks];
    setBlocks(newBlocks);
    await sleep(delay);
  }
  const newBlocks = prevBlocks.map((block) => {
    return { ...block, color: "white" };
  });
  setBlocks(newBlocks);
};

export const isSorted = (prevBlocks: Block[]) => {
  for (let i = 0; i + 1 < prevBlocks.length; i++) {
    if (prevBlocks[i].val > prevBlocks[i + 1].val) {
      return false;
    }
  }
  return true;
};

export const stop = (
  prevBlocks: Block[],
  setBlocks: (newBlocks: Block[]) => void
) => {
  const newBlocks = prevBlocks.map((block) => {
    return { ...block, color: "white" };
  });
  setBlocks(newBlocks);
  return;
};
