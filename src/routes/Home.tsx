import "./styles/Home.css";
import { Code } from "../components/Code";
import { Description } from "../components/Description";
import { Header } from "../components/Header";
import { Selection } from "../components/Selection";
import { Link } from "react-router-dom";
import {
  RightArrowIcon,
  VolumeActiveIcon,
  VolumeNonActiveIcon,
} from "../icons";
import { useVolume } from "../hooks/useVolume";
import { MainPlayground } from "../components/MainPlayground";

export const Home = () => {
  const { volume, changeVolume } = useVolume();

  const isVolumeActive = volume === 0.1;
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
        <MainPlayground />
        <Code />
        <Description />
      </main>
    </>
  );
};
