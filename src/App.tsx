import "./App.css";
import { Blocks } from "./components/Blocks";
import { Code } from "./components/Code";
import { Configuration } from "./components/Configuration";
import { Header } from "./components/Header";
import { Selection } from "./components/Selection";
import { SortOptions } from "./components/SortOptions";
import { useSort } from "./hooks/useSort";

function App() {
  const {
    blocks,
    setBlocks,
    changeIsSorting,
    isSorting,
    changeVelocity,
    changeElements,
  } = useSort();
  return (
    <main className="main-container">
      <Header />
      <Selection />
      <Blocks blocks={blocks} />
      <SortOptions
        isSorting={isSorting}
        blocks={blocks}
        setBlocks={setBlocks}
      />
      <Configuration
        changeVelocity={changeVelocity}
        changeIsSorting={changeIsSorting}
        changeElements={changeElements}
        blocks={blocks}
        isSorting={isSorting}
      />
      <Code />
    </main>
  );
}

export default App;
