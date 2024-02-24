import { useSort } from "../hooks/useSort";
import "./styles/Blocks.css";

export const Blocks = () => {
  const { blocks } = useSort();

  return (
    <div className="blocks-container">
      {blocks.map(({ val, color }) => {
        return (
          <div
            key={crypto.randomUUID()}
            className="block"
            style={{ height: `${val * 10}px`, backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
};
