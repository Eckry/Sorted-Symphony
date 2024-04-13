import { Block } from "../types";
import "./styles/Blocks.css";

interface Props {
  blocks: Block[];
}

export const Blocks: React.FC<Props> = ({ blocks }) => {
  const width = (-1 / 190) * blocks.length + 39 / 19;

  return (
    <div className="blocks-container">
      {blocks.map(({ val, color }) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="block"
            style={{
              height: `${(val * 100) / blocks.length}%`,
              backgroundColor: color,
              borderTop: `${width}px solid var(--highlight-color)`
            }}
          >
            <span
              className="block-top"
              style={{ height: `${100 / val}%`, width: `${width}px` }}
            ></span>
          </div>
        );
      })}
    </div>
  );
};
