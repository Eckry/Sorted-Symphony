import { algorithms, languages, sortOptions } from "./consts";

export type Algorithm = (typeof algorithms)[keyof typeof algorithms];
export type SortOption = (typeof sortOptions)[keyof typeof sortOptions];
export type Language = (typeof languages)[keyof typeof languages];
export type AudioFile =
  | "./DO.mp3"
  | "./RE.mp3"
  | "./FA.mp3"
  | "./LA.mp3"
  | "./MI.mp3"
  | "./SOL.mp3";

export interface AlgorithmInformation {
  description: string;
  time: {
    avg: string;
    best: string;
    worst: string;
    space: string;
  };
}

export interface Codes {
  javascript: string;
  python: string;
  cpp: string;
  java: string;
}

export type Block = {
  val: number;
  color: string;
};

export interface Configuration {
  velocity: number;
  elements: number;
  volume: number;
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
