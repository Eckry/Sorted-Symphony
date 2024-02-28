import "./App.css";
import { Blocks } from "./components/Blocks";
import { Configuration } from "./components/Configuration";
import { Header } from "./components/Header";
import { Selection } from "./components/Selection";
import { SortOptions } from "./components/SortOptions";
import { useSort } from "./hooks/useSort";

function App() {
  const { blocks, setBlocks, changeIsSorting } = useSort();
  return (
    <main className="main-container">
      <Header />
      <Selection />
      <Blocks blocks={blocks} />
      <SortOptions blocks={blocks} setBlocks={setBlocks} />
      <Configuration changeIsSorting={changeIsSorting} />
    </main>
  );
}

export default App;
