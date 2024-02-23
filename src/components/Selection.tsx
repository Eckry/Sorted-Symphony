import "./styles/Selection.css";
import { algorithms } from "../consts";
import { Option } from "./Option";

export const Selection = () => {
  return (
    <ul className="selection-container">
      {Object.entries(algorithms).map(([, val]) => {
        return (
            <Option key={val} name={val}/>
        );
      })}
    </ul>
  );
};
