/* eslint-disable react-hooks/exhaustive-deps */
import "./styles/PlaygroundBlock.css";
import { useEffect, useState } from "react";
import { Algorithm, SortOption, SortingAlgorithms } from "../types";
import { Blocks } from "./Blocks";
import { BubbleSort } from "../algorithms/BubbleSort";
import { SelectionSort } from "../algorithms/SelectionSort";
import { HeapSort } from "../algorithms/HeapSort";
import { InsertionSort } from "../algorithms/InsertionSort";
import { QuickSort } from "../algorithms/QuickSort";
import { MergeSort } from "../algorithms/MergeSort";
import { lowShuffle, shuffle } from "../helpers";
import { initialBlocks, sortOptions } from "../consts";

interface Props {
  algorithm: Algorithm;
  option: SortOption;
  isSorting: boolean;
  setIsSorting: (newIsSorting: SortingAlgorithms) => void;
}

const imports = {
  BubbleSort,
  SelectionSort,
  QuickSort,
  MergeSort,
  InsertionSort,
  HeapSort,
};

export const PlaygroundBlock: React.FC<Props> = ({
  algorithm,
  option,
  isSorting,
  setIsSorting,
}) => {
  const [blocks, setBlocks] = useState(() => {
    if (option === sortOptions.NEARLY_SORTED) return lowShuffle(initialBlocks);
    if (option === sortOptions.RANDOM) return shuffle(initialBlocks);
    return initialBlocks;
  });

  const handleSortFinished = (finished: boolean) => {
    setIsSorting((prevState: SortingAlgorithms) => {
      return {
        ...prevState,
        [algorithm]: { ...prevState[algorithm], [option]: finished },
      };
    });
  };

  const [init, stop] = imports[algorithm]();

  useEffect(() => {
    if (!isSorting) return stop();
    init(blocks, setBlocks, { velocity: 25, elements: 0 }, handleSortFinished);
  }, [isSorting]);

  return (
    <div className="playground-block">
      <Blocks blocks={blocks} />
    </div>
  );
};
