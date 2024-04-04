/* eslint-disable react-hooks/exhaustive-deps */
import "./styles/PlaygroundBlock.css";
import React, { useEffect, useState } from "react";
import { Algorithm, Configuration, SortOption } from "../types";
import { Blocks } from "./Blocks";
import { BubbleSort } from "../algorithms/BubbleSort";
import { SelectionSort } from "../algorithms/SelectionSort";
import { HeapSort } from "../algorithms/HeapSort";
import { InsertionSort } from "../algorithms/InsertionSort";
import { QuickSort } from "../algorithms/QuickSort";
import { MergeSort } from "../algorithms/MergeSort";
import { initialBlocks } from "../consts";
import { ShakerSort } from "../algorithms/ShakerSort";
import { useVolume } from "../hooks/useVolume";

const elise = new Audio("./elise.mp3");

interface Props {
  algorithm: Algorithm;
  option: SortOption;
  position: `${number}-${number}`;
  count: React.MutableRefObject<number>;
}

const imports = {
  BubbleSort,
  SelectionSort,
  QuickSort,
  MergeSort,
  InsertionSort,
  HeapSort,
  ShakerSort,
};

export const PlaygroundBlock: React.FC<Props> = ({
  algorithm,
  option,
  position,
  count,
}) => {
  const [blocks, setBlocks] = useState([...initialBlocks[option]]);
  const [isSorting, setIsSorting] = useState(false);
  const { volume } = useVolume();
  const [init, stop] = imports[algorithm](true, count);

  const handleOnClick = () => {
    if (!isSorting) {
      setBlocks([...initialBlocks[option]]);
      count.current++;
      setIsSorting((prev) => !prev);
    } else {
      setIsSorting((prev) => !prev);
    }
  };

  const configuration: Configuration = { velocity: 75, elements: 0, volume };

  useEffect(() => {
    if (!isSorting) {
      stop();
      if (count.current === 0) {
        elise.pause();
        elise.currentTime = 0;
      } else {
        elise.volume = volume;
        elise.play();
      }
      return;
    }

    if (count.current !== 0) {
        elise.volume = volume;
        elise.play();
    }
    init(blocks, setBlocks, configuration, setIsSorting);
  }, [isSorting]);

  return (
    <div
      onClick={handleOnClick}
      className={`playground-block playground-block-${position}`}
    >
      <Blocks blocks={blocks} />
    </div>
  );
};
