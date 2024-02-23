import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Selection } from "./components/Selection";
import { type Algorithm } from "./types";
import { algorithms } from "./consts";

function App() {
  const [selected, setSelected] = useState<Algorithm>(algorithms.BUBBLESORT);

  const handleOnSetSelected = (name: Algorithm) => {
    setSelected(name);
  }

  return (
    <main className="main-container">
      <Header />
      <Selection selected={selected} handleOnSetSelected={handleOnSetSelected}/>
    </main>
  );
}

export default App;
