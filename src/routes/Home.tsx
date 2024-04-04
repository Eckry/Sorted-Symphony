import "./styles/Home.css";
import { Blocks } from "../components/Blocks";
import { Code } from "../components/Code";
import { Configuration } from "../components/Configuration";
import { Description } from "../components/Description";
import { Header } from "../components/Header";
import { Selection } from "../components/Selection";
import { SortOptions } from "../components/SortOptions";
import { useSort } from "../hooks/useSort";
import { Link } from "react-router-dom";
import {
  RightArrowIcon,
  VolumeActiveIcon,
  VolumeNonActiveIcon,
} from "../icons";

export const Home = () => {
  const {
    blocks,
    setBlocks,
    changeIsSorting,
    isSorting,
    changeVelocity,
    changeElements,
    configuration,
    changeVolume,
  } = useSort();

  const isVolumeActive = configuration.volume === 0.1;
  return (
    <>
      <button onClick={changeVolume} className="volume-button">
        {isVolumeActive ? <VolumeActiveIcon /> : <VolumeNonActiveIcon />}
      </button>
      <main className="main-container">
        <Header />
        <Link className="link-orchestra" to="/comparison">
          Go to the Orchestra <RightArrowIcon />
        </Link>
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
          configuration={configuration}
        />
        <Code />
        <Description />
      </main>
    </>
  );
};
