import "./styles/SortOptions.css";
import { sortOptions } from "../consts";
import React from "react";

interface Props {
  shuffleElements: (type: string) => void;
  isSorting: boolean;
}

export const SortOptions: React.FC<Props> = React.memo(
  ({ shuffleElements, isSorting }) => {
    const handleRandom = () => {
      shuffleElements(sortOptions.RANDOM);
    };
    console.log("s")
    const handleReversed = () => {
      shuffleElements(sortOptions.REVERSED);
    };

    const handleNearlySorted = () => {
      shuffleElements(sortOptions.NEARLY_SORTED);
    };

    return (
      <footer className="sortoptions-container">
        <button
          disabled={isSorting}
          className="sortoption"
          onClick={handleRandom}
        >
          {sortOptions.RANDOM}
        </button>
        <button
          disabled={isSorting}
          className="sortoption"
          onClick={handleReversed}
        >
          {sortOptions.REVERSED}
        </button>
        <button
          disabled={isSorting}
          className="sortoption"
          onClick={handleNearlySorted}
        >
          {sortOptions.NEARLY_SORTED}
        </button>
      </footer>
    );
  }
);
