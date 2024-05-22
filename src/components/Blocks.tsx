import React from "react";
import { Block } from "../types";
import "./styles/Blocks.css";

interface Props {
  blocks: Block[];
}

interface BlockProps {
  height: number;
  width: number;
  color: string;
  spanHeight: number;
}

const LineBlock: React.FC<BlockProps> = React.memo(
  ({ height, width, color, spanHeight }) => {
    return (
      <div
        key={crypto.randomUUID()}
        className="block"
        style={{
          height: `${height}%`,
          backgroundColor: color,
          borderTop: `${width}px solid var(--highlight-color)`,
        }}
      >
        <span
          className="block-top"
          style={{ height: `${spanHeight}%`, width: `${width}px` }}
        ></span>
      </div>
    );
  }
);

export const Blocks: React.FC<Props> = ({ blocks }) => {
  const width = (-1 / 190) * blocks.length + 39 / 19;
  return (
    <div className="blocks-container">
      {blocks.map(({ val, color }) => {
        return (
          <LineBlock
            key={crypto.randomUUID()}
            height={(val * 100) / blocks.length}
            width={width}
            color={color}
            spanHeight={100 / val}
          />
        );
      })}
    </div>
  );
};
