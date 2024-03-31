import "./styles/Description.css";
import { useSelected } from "../hooks/useSelected";
import { information } from "../information";

export const Description = () => {
  const { selected } = useSelected();

  const description = information[selected].description;

  const timeComplexity = {
    Average: information[selected].time.avg,
    "Best case": information[selected].time.best,
    "Worst case": information[selected].time.worst,
    "Space complexity": information[selected].time.space,
  };
  return (
    <section className="description-container">
      <header className="description-header">
        <h1>Learn more about {selected}</h1>
      </header>
      <div className="description-grid">
        <div>
          <h2 className="description-title">Description</h2>
          <p className="description-text">{description}</p>
        </div>
        <aside className="extra-information">
          <h2 className="description-title">Complexity</h2>
          <ul>
            {Object.entries(timeComplexity).map(([title, complexity]) => {
              return (
                <li className="description-text complexity" key={title}>
                  {title}: {complexity}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
};
