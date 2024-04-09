/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelected } from "./useSelected";
import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import {
  colors,
  initialBlocks,
  initialConfiguration,
  initImports,
  sortOptions,
} from "../consts";
import { useVolume } from "./useVolume";
import { lowShuffle, shuffle } from "../helpers";

export const useSort = () => {
  const { volume } = useVolume();
  const { selected } = useSelected();
  const [blocks, setBlocks] = useState([...initialBlocks.Random]);
  const isSortingRef = useRef(false);
  const [isSorting, setIsSorting] = useState(false);
  const [configuration, setConfiguration] = useState(initialConfiguration);
  const [init, stop] = initImports[selected](false, null);

  const changeIsSorting = useCallback(() => {
    isSortingRef.current = !isSortingRef.current;
    setIsSorting((prevIsSorting) => !prevIsSorting);
  }, []);

  const changeElements = useCallback(({ elements }: ConfigurationElements) => {
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
      const newBlocks = prevBlocks.slice(0, elements);
      setBlocks(newBlocks);
    }
  }, []);

  const changeVelocity = useCallback(({ velocity }: ConfigurationVelocity) => {
    setConfiguration((prevConfig) => {
      return { ...prevConfig, velocity: 200 - velocity };
    });
  }, []);

  const shuffleElements = (type: string) => {
    if (type === sortOptions.RANDOM) {
      const newBlocks = shuffle([...blocks]);
      setBlocks(newBlocks);
    }

    if (type === sortOptions.REVERSED) {
      const newBlocks = [...blocks];
      newBlocks.sort((a, b) => b.val - a.val);
      setBlocks(newBlocks);
    }

    if (type === sortOptions.NEARLY_SORTED) {
      const newBlocks = lowShuffle([...blocks]);
      setBlocks(newBlocks);
    }
  };

  useEffect(() => {
    if (!isSorting) return stop();
    init(blocks, setBlocks, { ...configuration, volume }, setIsSorting);
  }, [isSorting]);

  return {
    blocks,
    changeIsSorting,
    isSorting,
    changeVelocity,
    changeElements,
    configuration,
    shuffleElements,
  };
};
