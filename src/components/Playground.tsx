import "./styles/Playground.css";
import { Algorithm, SortOption, SortingAlgorithms } from "../types";
import { algorithms, sortOptions } from "../consts";
import { PlaygroundBlock } from "./PlaygroundBlock";
import { useState } from "react";

interface Props {
  algorithmsSelected: Algorithm[];
}

const initialIsSorting: SortingAlgorithms = {};

Object.values(algorithms).forEach((algorithm) => {
  if (!initialIsSorting[algorithm]) initialIsSorting[algorithm] = {};
  Object.values(sortOptions).forEach((sortOption: SortOption) => {
    initialIsSorting[algorithm][sortOption] = false;
  });
});

export const Playground: React.FC<Props> = ({ algorithmsSelected }) => {
  const [isSorting, setIsSorting] = useState(initialIsSorting);

  const handleActivateColumn = (column: number) => () => {
    setIsSorting((prevState) => {
      const newState = structuredClone(prevState);
      algorithmsSelected.forEach((algorithm) => {
        Object.values(sortOptions).forEach(
          (sortOption: SortOption, idx: number) => {
            if (idx === column)
              newState[algorithm][sortOption] =
                !newState[algorithm][sortOption];
          }
        );
      });

      return newState;
    });
  };

  const isSomeoneSorting = (sortOption: SortOption) => {
    return algorithmsSelected.some(
      (algorithm) => isSorting[algorithm][sortOption]
    );
  };

  return (
    <section className="playground-container">
      <div className="playground-type">
        <span></span>
        <button
          disabled={isSomeoneSorting(sortOptions.RANDOM)}
          onClick={handleActivateColumn(0)}
        >
          Random
        </button>
        <button
          disabled={isSomeoneSorting(sortOptions.REVERSED)}
          onClick={handleActivateColumn(1)}
        >
          Reversed
        </button>
        <button
          disabled={isSomeoneSorting(sortOptions.NEARLY_SORTED)}
          onClick={handleActivateColumn(2)}
        >
          Nearly sorted
        </button>
        {algorithmsSelected.map((algorithm) => {
          return (
            <>
              <p>{algorithm}</p>
              {Object.values(sortOptions).map((sortOption) => {
                return (
                  <PlaygroundBlock
                    isSorting={isSorting[algorithm][sortOption]}
                    algorithm={algorithm}
                    option={sortOption}
                    setIsSorting={setIsSorting}
                    key={`${algorithm}-${sortOption}`}
                  />
                );
              })}
            </>
          );
        })}
      </div>
    </section>
  );
};
