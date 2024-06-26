import "./styles/Playground.css";
import { Algorithm } from "../types";
import { sortOptions } from "../consts";
import { PlaygroundBlock } from "./PlaygroundBlock";
import React, { useEffect, useRef } from "react";
import { PlayIcon } from "../icons";

interface Props {
  algorithmsSelected: Algorithm[];
}

export const Playground: React.FC<Props> = ({ algorithmsSelected }) => {
  const count = useRef(0);

  let gridColumns;
  const width = window.innerWidth;
  if (width > 840)
    gridColumns = `repeat(${algorithmsSelected.length + 1}, 1fr)`;
  else gridColumns = `repeat(${4}, 1fr)`;

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

  const gridStyle = {
    gridTemplateColumns: gridColumns,
  };

  useEffect(() => {
    return () => {
      count.current = 0;
    };
  });

  return (
    <section style={gridStyle} className="playground-container">
      <button className="algorithm-button" onClick={handleClickAll}>
        <PlayIcon />
        All
      </button>
      {algorithmsSelected.map((algorithm, idx) => {
        return (
          <button
            className="algorithm-button"
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
            <button
              className="algorithm-button"
              onClick={createHandleRowClick(row)}
            >
              <PlayIcon />
              {sortOption}
            </button>
            {algorithmsSelected.map((algorithm, column) => {
              return (
                <PlaygroundBlock
                  count={count}
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
    </section>
  );
};
