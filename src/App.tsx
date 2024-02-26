import "./App.css";
import { Blocks } from "./components/Blocks";
import { Header } from "./components/Header";
import { Selection } from "./components/Selection";
import { SortOptions } from "./components/SortOptions";
import { useSort } from "./hooks/useSort";

function App() {
  const { blocks, setBlocks } = useSort();
  return (
    <main className="main-container">
      <Header />
      <Selection />
      <Blocks blocks={blocks}/>
      <SortOptions blocks={blocks} setBlocks={setBlocks}/>
    </main>
  );
}

export default App;
