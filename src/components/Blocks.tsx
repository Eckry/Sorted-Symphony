import { Block } from "../types";
import "./styles/Blocks.css";

interface Props {
  blocks: Block[];
}

export const Blocks: React.FC<Props> = ({ blocks }) => {
  return (
    <div className="blocks-container">
      {blocks.map(({ val, color }) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="block"
            style={{ height: `${val * 100 / blocks.length}%`, backgroundColor: color }}
          ><span className="block-top" style={{height: `${100 / val}%`}}></span></div>
        );
      })}
    </div>
  );
};
