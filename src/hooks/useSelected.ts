import { useContext } from "react"
import { SelectedContext } from "../context/Selected";

export const useSelected = () => {
  const {selected, setSelected} = useContext(SelectedContext);
  return {selected, setSelected}
}