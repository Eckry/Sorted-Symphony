import "./styles/Selection.css";
import { algorithms } from "../consts";
import { Option } from "./Option";
import { useSelected } from "../hooks/useSelected";

export const Selection = () => {
  const { selected, setSelected } = useSelected();

  return (
    <ul className="selection-container">
      {Object.entries(algorithms).map(([, val]) => {
        return (
          <Option
            selected={selected}
            setSelected={setSelected}
            key={val}
            name={val}
          />
        );
      })}
    </ul>
  );
};
