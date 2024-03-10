import "./styles/PlaygroundBlock.css";
import { useEffect, useState } from "react";
import { Algorithm, SortOption } from "../types";
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
}

export const PlaygroundBlock: React.FC<Props> = ({ algorithm, option }) => {
  const [blocks, setBlocks] = useState(() => {
    if (option === sortOptions.NEARLY_SORTED) return lowShuffle(initialBlocks);
    if (option === sortOptions.RANDOM) return shuffle(initialBlocks);
    return initialBlocks;
  });

  const getAlgorithm = (algorithm: Algorithm) => {
    switch (algorithm) {
      case "BubbleSort":
        return BubbleSort();
      case "SelectionSort":
        return SelectionSort();
      case "QuickSort":
        return QuickSort();
      case "MergeSort":
        return MergeSort();
      case "InsertionSort":
        return InsertionSort();
      case "HeapSort":
        return HeapSort();
      default:
        return null;
    }
  };

  const algorithmSelected = getAlgorithm(algorithm);

  function placeholder() {
    return;
  }

  useEffect(() => {
    if (!algorithmSelected) return;
    algorithmSelected[`init${algorithm}`](
      blocks,
      setBlocks,
      { velocity: 10 },
      placeholder
    );
  }, []);

  return (
    <div className="playground-block">
      <Blocks blocks={blocks} />
    </div>
  );
};
