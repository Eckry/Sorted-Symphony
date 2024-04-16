import "./styles/About.css";
import { algorithms } from "../consts";
import { Link } from "react-router-dom";
import { RightArrowIcon } from "../icons";

export const About = () => {
  return (
    <main className="about-container">
      <h1 className="about-title">About</h1>
      <p className="about-text">
        This was done with the purpose of helping those students or curious
        people who decide to study sorting algorithms. I hope this page helps
        you resolve your doubts about any algorithm. If you want to contribute
        an algorithm or make any changes, you can make a pull request in the{" "}
        <a
          className="about-link"
          target="_blank"
          href="https://github.com/Eckry/Sorted-Symphony"
        >
          project's GitHub repository.
        </a>
      </p>
      <p className="about-text">
        Here is a list of the sorting algorithms so far:
      </p>
      <ul className="about-ul">
        {Object.values(algorithms).map((algorithm) => {
          return <li className="about-algorithm">{algorithm}</li>;
        })}
      </ul>
      <Link to="/" className="link-orchestra">
        Go to homepage <RightArrowIcon />
      </Link>
    </main>
  );
};
