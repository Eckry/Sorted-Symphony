/* eslint-disable react-hooks/exhaustive-deps */
import "./styles/PlaygroundBlock.css";
import { useEffect, useState } from "react";
import { Algorithm, Configuration, SortOption } from "../types";
import { Blocks } from "./Blocks";
import { BubbleSort } from "../algorithms/BubbleSort";
import { SelectionSort } from "../algorithms/SelectionSort";
import { HeapSort } from "../algorithms/HeapSort";
import { InsertionSort } from "../algorithms/InsertionSort";
import { QuickSort } from "../algorithms/QuickSort";
import { MergeSort } from "../algorithms/MergeSort";
import { initialBlocks } from "../consts";

interface Props {
  algorithm: Algorithm;
  option: SortOption;
  position: `${number}-${number}`;
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
  position,
}) => {
  const [blocks, setBlocks] = useState([...initialBlocks[option]]);
  const [isSorting, setIsSorting] = useState(false);

  const [init, stop] = imports[algorithm]();

  const handleOnClick = () => {
    if (!isSorting) setBlocks([...initialBlocks[option]]);
    setIsSorting((prev) => !prev);
  };

  useEffect(() => {
    if (!isSorting) return stop();
    init(blocks, setBlocks, configuration, setIsSorting);
  }, [isSorting]);

  const configuration: Configuration = { velocity: 25, elements: 0 };

  return (
    <div
      onClick={handleOnClick}
      className={`playground-block playground-block-${position}`}
    >
      <Blocks blocks={blocks} />
    </div>
  );
};
