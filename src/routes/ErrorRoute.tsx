import "./styles/ErrorRoute.css";
import { Link } from "react-router-dom";
import { RightArrowIcon } from "../icons";

export const ErrorRoute = () => {
  return (
    <main className="error-container">
      <h1 className="error-title">Oops!</h1>
      <h3 className="error-404">404 - PAGE NOT FOUND</h3>
      <p className="error-text">
        The page you are looking for doesn't exist, better go back to admire the
        beauty of the symphony created by the algorithms
      </p>
      <Link to="/" className="link-orchestra error-button">
        Go to homepage <RightArrowIcon />
      </Link>
    </main>
  );
};
