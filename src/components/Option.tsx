import { type Algorithm } from "../types";
import "./styles/Option.css";

interface Props {
  name: Algorithm;
  handleOnSetSelected: (name: Algorithm) => void;
  selected: Algorithm
}

export const Option: React.FC<Props> = ({ name, handleOnSetSelected, selected }) => {
  const handleOnClick = () => {
    handleOnSetSelected(name);
  };

  const className =  name === selected ? "option-selected" : "option"

  return (
    <li onClick={handleOnClick} className={className}>
      {name}
    </li>
  );
};
