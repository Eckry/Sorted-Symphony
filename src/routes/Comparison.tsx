import { useEffect, useState } from "react";
import "./styles/Comparison.css";
import { Algorithm } from "../types";
import { algorithms } from "../consts";
import { Playground } from "../components/Playground";

const initialAlgorithmsSelected: Algorithm[] = [
  "QuickSort",
  "MergeSort",
  "BubbleSort",
  "InsertionSort",
  "SelectionSort",
  "HeapSort",
];

export const Comparison = () => {
  const [algorithmsSelected, setAlgorithmsSelected] = useState<Algorithm[]>(
    initialAlgorithmsSelected
  );

  const addAlgorithm = (algorithmToAdd: Algorithm) => {
    if (algorithmsSelected.includes(algorithmToAdd)) return;

    const newAlgorithms = algorithmsSelected.slice(
      0,
      algorithmsSelected.length - 1
    );
    setAlgorithmsSelected([algorithmToAdd, ...newAlgorithms]);
  };

  useEffect(() => {
    const width = window.innerWidth;

    if (width > 840) setAlgorithmsSelected(initialAlgorithmsSelected);
    else setAlgorithmsSelected(algorithmsSelected.slice(0, 3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="comparison-container">
      <header className="comparison-header">
        <h1 className="header-title">Orchestra</h1>
        <p className="header-phrase">
          Compare all the algorithms you want and pay attention to the their
          symphony
        </p>
      </header>
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
  );
};
