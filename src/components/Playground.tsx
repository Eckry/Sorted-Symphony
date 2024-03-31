import "./styles/Playground.css";
import { Algorithm } from "../types";
import { sortOptions } from "../consts";
import { PlaygroundBlock } from "./PlaygroundBlock";
import React from "react";
import { PlayIcon } from "../icons";

interface Props {
  algorithmsSelected: Algorithm[];
}

export const Playground: React.FC<Props> = ({ algorithmsSelected }) => {
  const createHandleColumnClick = (column: number) => () => {
    Object.values(sortOptions).forEach((_, row) => {
      const block = document.querySelector(
        `.playground-block-${column}-${row}`
      );

      if (block instanceof HTMLElement) {
        block.click();
      }
    });
  };

  const createHandleRowClick = (row: number) => () => {
    algorithmsSelected.forEach((_, column) => {
      const block = document.querySelector(
        `.playground-block-${column}-${row}`
      );

      if (block instanceof HTMLElement) {
        block.click();
      }
    });
  };

  const handleClickAll = () => {
    Object.values(sortOptions).forEach((_, row) => {
      algorithmsSelected.forEach((__, column) => {
        const block = document.querySelector(
          `.playground-block-${column}-${row}`
        );

        if (block instanceof HTMLElement) {
          block.click();
        }
      });
    });
  };

  const gridColumns = {
    gridTemplateColumns: `repeat(${algorithmsSelected.length + 1}, 1fr)`,
  };

  return (
    <section className="playground-container">
      <div style={gridColumns} className="playground-type">
        <button className="click-all" onClick={handleClickAll}>
          <PlayIcon />
        </button>
        {algorithmsSelected.map((algorithm, idx) => {
          return (
            <button
              key={`${algorithm}-${idx}`}
              onClick={createHandleColumnClick(idx)}
            >
              <PlayIcon />
              {algorithm}
            </button>
          );
        })}

        {Object.values(sortOptions).map((sortOption, row) => {
          return (
            <React.Fragment key={crypto.randomUUID()}>
              <button onClick={createHandleRowClick(row)}>
                <PlayIcon />
                {sortOption}
              </button>
              {algorithmsSelected.map((algorithm, column) => {
                return (
                  <PlaygroundBlock
                    algorithm={algorithm}
                    option={sortOption}
                    position={`${column}-${row}`}
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
