import "./styles/Footer.css";
import { Link } from "react-router-dom";
import { GitHubIcon } from "../icons";

export const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-ul">
        <li className="footer-li">
          <Link to="/contact">Contact me</Link>
        </li>
        <li className="footer-li">
          <a target="_blank" href="https://github.com/Eckry/Sorted-Symphony">
            <GitHubIcon />
          </a>
        </li>
        <li className="footer-li">
          <Link to="/about">About</Link>
        </li>
      </ul>
    </footer>
  );
};
