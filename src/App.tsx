import "./App.css";
import { Blocks } from "./components/Blocks";
import { Header } from "./components/Header";
import { Selection } from "./components/Selection";

function App() {
  return (
    <main className="main-container">
      <Header />
      <Selection />
      <Blocks />
    </main>
  );
}

export default App;
