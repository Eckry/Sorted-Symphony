import { algorithms, languages, sortOptions } from "./consts";

export type Algorithm = (typeof algorithms)[keyof typeof algorithms];
export type SortOption = (typeof sortOptions)[keyof typeof sortOptions];
export type Language = (typeof languages)[keyof typeof languages];
export type AudioFile =
  | "./DO.wav"
  | "./RE.wav"
  | "./FA.wav"
  | "./LA.wav"
  | "./MI.wav"
  | "./SOL.wav";

export interface AlgorithmInformation {
  description: string;
  time: {
    avg: string;
    best: string;
    worst: string;
    space: string;
  };
}

export type Block = {
  val: number;
  color: string;
};

export interface Configuration {
  velocity: number;
  elements: number;
}

export type ConfigurationElements = Pick<Configuration, "elements">;
export type ConfigurationVelocity = Pick<Configuration, "velocity">;

export type AlgorithmFunction = [
  (
    blocks: Block[],
    setBlocks: (newBLocks: Block[]) => void,
    configuration: Configuration,
    setIsSorting: (newIsSorting: boolean) => void
  ) => void,
  () => void
];