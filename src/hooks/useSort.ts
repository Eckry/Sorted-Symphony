/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelected } from "./useSelected";
import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import {
  colors,
  initialBlocks,
  initialConfiguration,
  initImports,
} from "../consts";
import { useVolume } from "./useVolume";

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

  useEffect(() => {
    if (!isSorting) return stop();
    init(blocks, setBlocks, { ...configuration, volume }, setIsSorting);
  }, [isSorting]);

  return {
    blocks,
    setBlocks,
    changeIsSorting,
    isSorting,
    changeVelocity,
    changeElements,
    configuration,
  };
};
