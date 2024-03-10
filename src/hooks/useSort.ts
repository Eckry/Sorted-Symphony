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

const initialBlocks = [
  { val: 10, color: "white" },
  { val: 9, color: "white" },
  { val: 8, color: "white" },
  { val: 7, color: "white" },
  { val: 6, color: "white" },
  { val: 5, color: "white" },
  { val: 4, color: "white" },
  { val: 3, color: "white" },
  { val: 2, color: "white" },
  { val: 1, color: "white" },
];

const initialConfiguration = {
  velocity: 50,
  elements: 100,
};

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
  const [blocks, setBlocks] = useState(initialBlocks);
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
        newElements.push({ val: i + 1, color: "white" });
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
      return { ...prevConfig, velocity: 100 - velocity };
    });
  };

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
  };
};
