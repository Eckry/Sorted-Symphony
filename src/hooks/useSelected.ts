import { useContext } from "react";
import { SelectedContext } from "../context/Selected";
import { codes } from "../codes";

export const useSelected = () => {
  const { selected, setSelected } = useContext(SelectedContext);

  const code = codes[selected]

  return { selected, code, setSelected };
};
