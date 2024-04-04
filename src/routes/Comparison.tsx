import { useState } from "react";
import "./styles/Comparison.css";
import { Algorithm } from "../types";
import { algorithms } from "../consts";
import { Playground } from "../components/Playground";
import { Link } from "react-router-dom";
import { RightArrowIcon, VolumeActiveIcon, VolumeNonActiveIcon } from "../icons";
import { useVolume } from "../hooks/useVolume";

const initialAlgorithmsSelected: Algorithm[] = [
  "QuickSort",
  "MergeSort",
  "BubbleSort",
  "InsertionSort",
  "SelectionSort",
  "HeapSort",
];

export const Comparison = () => {
  const { volume, changeVolume } = useVolume();

  const [algorithmsSelected, setAlgorithmsSelected] = useState<Algorithm[]>(
    () => {
      const width = window.innerWidth;
      if (width > 840) return initialAlgorithmsSelected;
      return initialAlgorithmsSelected.slice(0, 3);
    }
  );

  const addAlgorithm = (algorithmToAdd: Algorithm) => {
    if (algorithmsSelected.includes(algorithmToAdd)) return;

    const newAlgorithms = algorithmsSelected.slice(
      0,
      algorithmsSelected.length - 1
    );
    setAlgorithmsSelected([algorithmToAdd, ...newAlgorithms]);
  };

  const isVolumeActive = volume === 0.1;

  return (
    <>
      <button onClick={changeVolume} className="volume-button">
        {isVolumeActive ? <VolumeActiveIcon /> : <VolumeNonActiveIcon />}
      </button>
      <main className="comparison-container">
        <header className="comparison-header">
          <h1 className="header-title">Orchestra</h1>
          <p className="header-phrase">
            Compare all the algorithms you want and pay attention to the their
            symphony
          </p>
        </header>
        <Link className="link-orchestra" to="/">
          Leave the Orchestra <RightArrowIcon />
        </Link>
        <ul className="selection-container">
          {Object.values(algorithms).map((algorithm) => {
            return (
              <li
                className={
                  algorithmsSelected.includes(algorithm)
                    ? "option-selected"
                    : "option"
                }
                onClick={() => addAlgorithm(algorithm)}
                key={algorithm}
              >
                {algorithm}
              </li>
            );
          })}
        </ul>
        <Playground algorithmsSelected={algorithmsSelected} />
      </main>
    </>
  );
};
