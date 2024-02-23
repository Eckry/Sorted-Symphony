import { type Algorithm } from "../types";
import "./styles/Option.css";

interface Props {
  name: Algorithm;
  setSelected: (name: Algorithm) => void;
  selected: Algorithm
}

export const Option: React.FC<Props> = ({ name, setSelected, selected }) => {
  const handleOnClick = () => {
    setSelected(name);
  };

  const className =  name === selected ? "option-selected" : "option"

  return (
    <li onClick={handleOnClick} className={className}>
      {name}
    </li>
  );
};
