import "./styles/Selection.css";
import { algorithms } from "../consts";
import { Option } from "./Option";
import { Algorithm } from "../types";

interface Props {
  handleOnSetSelected: (name: Algorithm) => void;
  selected: Algorithm;
}

export const Selection: React.FC<Props> = ({ handleOnSetSelected, selected }) => {
  return (
    <ul className="selection-container">
      {Object.entries(algorithms).map(([, val]) => {
        return (
          <Option
            handleOnSetSelected={handleOnSetSelected}
            key={val}
            name={val}
            selected={selected}
          />
        );
      })}
    </ul>
  );
};
