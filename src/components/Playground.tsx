import "./styles/Playground.css";
import { Algorithm } from "../types";
import { sortOptions } from "../consts";
import { PlaygroundBlock } from "./PlaygroundBlock";
import React from "react";

interface Props {
  algorithmsSelected: Algorithm[];
}

export const Playground: React.FC<Props> = ({ algorithmsSelected }) => {
  const handleColumnClick = (column: number) => {
    algorithmsSelected.forEach((_, idx) => {
      const block = document.querySelector(
        `.playground-block-${idx}-${column}`
      );

      if (block instanceof HTMLElement) {
        block.click();
      }
    });
  };

  return (
    <section className="playground-container">
      <div className="playground-type">
        <span></span>
        {Object.values(sortOptions).map((option, idx) => {
          return (
            <button onClick={() => handleColumnClick(idx)}>{option}</button>
          );
        })}

        {algorithmsSelected.map((algorithm, x) => {
          return (
            <React.Fragment key={crypto.randomUUID()}>
              <p>{algorithm}</p>
              {Object.values(sortOptions).map((sortOption, y) => {
                return (
                  <PlaygroundBlock
                    algorithm={algorithm}
                    option={sortOption}
                    position={`${x}-${y}`}
                    key={`${algorithm}-${sortOption}`}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
