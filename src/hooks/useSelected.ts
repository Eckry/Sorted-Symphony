import { useContext } from "react";
import { SelectedContext } from "../context/SelectedContext";

export const useSelected = () => {
  const { selected, setSelected } = useContext(SelectedContext);

  return { selected, setSelected };
};
