import "./styles/Description.css"
import { useSelected } from "../hooks/useSelected";

export const Description = () => {
  const { selected } = useSelected();

  return (
    <section>
      <header>
        <h1>More information about {selected}</h1>
      </header>
      <div className="description-container">
        <div>
          <p>Description...</p>
        </div>
        <aside className="extra-information">Time complexity</aside>
      </div>
    </section>
  );
};
