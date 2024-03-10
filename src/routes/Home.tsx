import "./styles/Home.css";
import { Blocks } from "../components/Blocks";
import { Code } from "../components/Code";
import { Configuration } from "../components/Configuration";
import { Description } from "../components/Description";
import { Header } from "../components/Header";
import { Selection } from "../components/Selection";
import { SortOptions } from "../components/SortOptions";
import { useSort } from "../hooks/useSort";

export const Home = () => {
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
      <div className="home-blocks">
        <Blocks blocks={blocks} />
      </div>
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
      <Description />
    </main>
  );
};
