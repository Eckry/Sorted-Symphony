import "./styles/Playground.css";
import { Algorithm } from "../types";
import { sortOptions } from "../consts";
import { PlaygroundBlock } from "./PlaygroundBlock";
import React from "react";

interface Props {
  algorithmsSelected: Algorithm[];
}

export const Playground: React.FC<Props> = ({ algorithmsSelected }) => {
  const createHandleColumnClick = (column: number) => () => {
    algorithmsSelected.forEach((_, idx) => {
      const block = document.querySelector(
        `.playground-block-${idx}-${column}`
      );

      if (block instanceof HTMLElement) {
        block.click();
      }
    });
  };

  const createHandleRowClick = (row: number) => () => {
    Object.values(sortOptions).forEach((_, idx) => {
      const block = document.querySelector(`.playground-block-${row}-${idx}`);

      if (block instanceof HTMLElement) {
        block.click();
      }
    });
  };

  const handleClickAll = () => {
    algorithmsSelected.forEach((_, row) => {
      Object.values(sortOptions).forEach((__, column) => {
        const block = document.querySelector(
          `.playground-block-${row}-${column}`
        );

        if (block instanceof HTMLElement) {
          block.click();
        }
      });
    });
  };

  return (
    <section className="playground-container">
      <div className="playground-type">
        <button onClick={handleClickAll}>All</button>
        {Object.values(sortOptions).map((option, idx) => {
          return (
            <button onClick={createHandleColumnClick(idx)}>{option}</button>
          );
        })}

        {algorithmsSelected.map((algorithm, x) => {
          return (
            <React.Fragment key={crypto.randomUUID()}>
              <button onClick={createHandleRowClick(x)}>{algorithm}</button>
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
