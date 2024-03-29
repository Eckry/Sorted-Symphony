/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useSelected } from "./useSelected";
import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import { BubbleSort } from "../algorithms/BubbleSort";
import { SelectionSort } from "../algorithms/SelectionSort";
import { QuickSort } from "../algorithms/QuickSort";
import { MergeSort } from "../algorithms/MergeSort";
import { InsertionSort } from "../algorithms/InsertionSort";
import { HeapSort } from "../algorithms/HeapSort";
import { colors, initialBlocks, initialConfiguration } from "../consts";

const imports = {
  BubbleSort,
  SelectionSort,
  QuickSort,
  MergeSort,
  InsertionSort,
  HeapSort,
};

export const useSort = () => {
  const { selected } = useSelected();
  const [blocks, setBlocks] = useState(initialBlocks.Random);
  const isSortingRef = useRef(false);
  const [isSorting, setIsSorting] = useState(false);
  const [configuration, setConfiguration] = useState(initialConfiguration);

  const [init, stop] = imports[selected]();

  const changeIsSorting = () => {
    isSortingRef.current = !isSortingRef.current;
    setIsSorting((prevIsSorting) => !prevIsSorting);
  };

  const changeElements = ({ elements }: ConfigurationElements) => {
    const length = blocks.length;
    if (length === elements) return;
    if (length < elements) {
      const newElements: Block[] = [];
      for (let i = length; i < elements; i++) {
        newElements.push({ val: i + 1, color: colors.DEFAULT });
      }
      const newBlocks = [...blocks, ...newElements].sort(
        (a, b) => a.val - b.val
      );
      setBlocks(newBlocks);
      return;
    } else {
      const prevBlocks = [...blocks].sort((a, b) => a.val - b.val);
      const newBlocks = prevBlocks.slice(0, elements - 1);
      setBlocks(newBlocks);
    }
  };

  const changeVelocity = ({ velocity }: ConfigurationVelocity) => {
    setConfiguration((prevConfig) => {
      return { ...prevConfig, velocity: 200 - velocity };
    });
  };

  console.log(configuration.velocity);
  useEffect(() => {
    if (!isSorting) return stop();
    init(blocks, setBlocks, configuration, setIsSorting);
  }, [isSorting]);

  return {
    blocks,
    setBlocks,
    changeIsSorting,
    isSorting,
    changeVelocity,
    changeElements,
    configuration
  };
};
