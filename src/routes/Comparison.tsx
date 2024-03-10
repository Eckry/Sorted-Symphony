import { useState } from "react";
import "./styles/Comparison.css";
import { Algorithm } from "../types";
import { algorithms } from "../consts";
import { Playground } from "../components/Playground";

export const Comparison = () => {
  const [algorithmsSelected, setAlgorithmsSelected] = useState<Algorithm[]>([]);

  const addAlgorithm = (algorithmToAdd: Algorithm) => {
    if (algorithmsSelected.includes(algorithmToAdd)) {
      const newAlgorithms = algorithmsSelected.filter(
        (algorithm) => algorithm !== algorithmToAdd
      );
      setAlgorithmsSelected(newAlgorithms);
      return;
    }
    setAlgorithmsSelected((prevState) => {
      return [...prevState, algorithmToAdd];
    });
  };

  return (
    <main className="comparison-container">
      <header className="comparison-header">
        <h1>Compare all the algorithms you want.</h1>
      </header>
      <ul>
        {Object.values(algorithms).map((algorithm) => {
          return (
            <li
              className={
                algorithmsSelected.includes(algorithm)
                  ? "algorithm-selected"
                  : "algorithm"
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
