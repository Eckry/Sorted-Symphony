import "./styles/Home.css";
import { Code } from "../components/Code";
import { Description } from "../components/Description";
import { Header } from "../components/Header";
import { Selection } from "../components/Selection";
import { Link } from "react-router-dom";
import { RightArrowIcon } from "../icons";
import { MainPlayground } from "../components/MainPlayground";
import { VolumeButton } from "../components/VolumeButton";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <>
      <VolumeButton />
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
      <Footer />
    </>
  );
};
