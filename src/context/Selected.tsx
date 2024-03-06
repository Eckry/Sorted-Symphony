import { createContext, useState } from "react";
import { algorithms } from "../consts";
import { type Algorithm } from "../types";

interface Props {
  selected: Algorithm;
  setSelected: (name: Algorithm) => void;
}

interface children {
  children: JSX.Element
}

export const SelectedContext = createContext<Props>({
  selected: "BubbleSort",
  setSelected: () => {},
});

export const SelectedProvider: React.FC<children> = ({ children }) => {
  const [selected, setSelected] = useState<Algorithm>(algorithms.QUICKSORT);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};
