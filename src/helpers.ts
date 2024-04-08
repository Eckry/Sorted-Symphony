import { Block, Configuration } from "./types";
import { colors } from "./consts";

const FREQ_MAX = 300;
const FREQ_MIN = 50;

const audioCtx = new AudioContext();

const play = (
  pitch: number,
  length: number,
  comparison: boolean,
  volume: number
) => {
  if (comparison) return;
  const oscillator = new OscillatorNode(audioCtx);
  const gainNode = new GainNode(audioCtx);

  oscillator.type = "square";

  const freq = Math.floor((pitch / length) * FREQ_MAX + FREQ_MIN);
  oscillator.frequency.value = freq;

  gainNode.gain.value = volume ? 0.01 : 0;

  oscillator.connect(gainNode).connect(audioCtx.destination);
  oscillator.start();

  setTimeout(function () {
    oscillator.stop();
  }, 50);
};

export const playFinish = (volume: number) => {
  const oscillator = new OscillatorNode(audioCtx);
  const gainNode = new GainNode(audioCtx);

  oscillator.type = "square";

  oscillator.frequency.value = 100;
  gainNode.gain.value = volume ? 0.01 : 0;

  oscillator.connect(gainNode).connect(audioCtx.destination);
  oscillator.start();
  
  setTimeout(function () {
    oscillator.stop();
  }, 100);
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
  configuration: Configuration,
  comparison: boolean,
  setBlocks: (newBlocks: Block[]) => void
) => {
  blocks[i] = { val: numberToInsert, color: colors.HIGHLIGHT };

  setBlocks([...blocks]);

  await sleep(configuration.velocity);
  play(numberToInsert, blocks.length, comparison, configuration.volume);

  blocks[i] = { val: numberToInsert, color: colors.DEFAULT };
  setBlocks([...blocks]);
};

export const swap = async (
  i: number,
  j: number,
  blocks: Block[],
  configuration: Configuration,
  comparison: boolean,
  setBlocks: (newBlocks: Block[]) => void
) => {
  const temp = { ...blocks[i], color: colors.HIGHLIGHT };
  blocks[i] = { ...blocks[j], color: colors.DEFAULT };
  blocks[j] = temp;

  setBlocks([...blocks]);

  await sleep(configuration.velocity);
  play(blocks[i].val, blocks.length, comparison, configuration.volume);

  blocks[j] = { ...blocks[j], color: colors.DEFAULT };

  setBlocks([...blocks]);
};

export const swapAndPaintBoth = async (
  i: number,
  j: number,
  blocks: Block[],
  configuration: Configuration,
  comparison: boolean,
  setBlocks: (newBlocks: Block[]) => void
) => {
  const temp = { ...blocks[i], color: colors.HIGHLIGHT };
  blocks[i] = { ...blocks[j], color: colors.HIGHLIGHT };
  blocks[j] = temp;

  setBlocks([...blocks]);

  await sleep(configuration.velocity);
  play(blocks[j].val, blocks.length, comparison, configuration.volume);

  blocks[i].color = colors.DEFAULT;
  blocks[j].color = colors.DEFAULT;

  setBlocks([...blocks]);
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
