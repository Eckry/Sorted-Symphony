import { Algorithm } from "../types";
import "./styles/Option.css"

interface Props {
  name: Algorithm;
}

export const Option: React.FC<Props> = ({ name }) => {
  return <li className="option">{name}</li>;
};
