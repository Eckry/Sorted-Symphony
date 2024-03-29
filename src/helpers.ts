import { Block } from "./types";
import { audios } from "./consts";
import { colors } from "./consts";

const play = (pitch: number, length: number) => {
  const audioIndex = Math.floor((pitch / length) * 5);
  const path = audios[audioIndex];
  const audioClone = new Audio(path);
  if (audioClone instanceof HTMLAudioElement) {
    audioClone.volume = 0.1;
    audioClone.play();
  }
};

const playFinish = () => {
  const audio = new Audio("./finish.mp3");
  audio.volume = 0.2;
  audio.play();
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
  blocks: Block[],
  numberToInsert: number,
  i: number,
  delay: number
) => {
  blocks.forEach((block, i) => {
    blocks[i] = { ...block, color: colors.DEFAULT };
  });

  blocks[i] = { val: numberToInsert, color: colors.HIGHLIGHT };

  await sleep(delay);
  play(numberToInsert, blocks.length);
};

export const swap = async (
  i: number,
  j: number,
  blocks: Block[],
  delay: number
) => {
  blocks.forEach((block, i) => {
    blocks[i] = { ...block, color: colors.DEFAULT };
  });

  const temp = { ...blocks[i], color: colors.HIGHLIGHT };
  blocks[i] = { ...blocks[j], color: colors.DEFAULT };
  blocks[j] = temp;

  await sleep(delay);

  play(blocks[i].val, blocks.length);
};

export const swapAndPaintBoth = async (
  i: number,
  j: number,
  blocks: Block[],
  delay: number
) => {
  blocks.forEach((block, i) => {
    blocks[i] = { ...block, color: colors.DEFAULT };
  });

  const temp = { ...blocks[i], color: colors.HIGHLIGHT };
  blocks[i] = { ...blocks[j], color: colors.HIGHLIGHT };
  blocks[j] = temp;

  await sleep(delay);
  
  play(blocks[j].val, blocks.length);
};

export const resetColor = async (
  prevBlocks: Block[],
  setBlocks: (blocks: Block[]) => void
) => {
  const newBlocks = prevBlocks.map((block) => {
    return { ...block, color: colors.DEFAULT };
  });
  setBlocks(newBlocks);
  playFinish();
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
    return { ...block, color: colors.DEFAULT };
  });
  setBlocks(newBlocks);
  return;
};
