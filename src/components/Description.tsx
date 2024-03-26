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
    <section>
      <header>
        <h1>More information about {selected}</h1>
      </header>
      <div className="description-container">
        <div>
          <p>{description}</p>
        </div>
        <aside className="extra-information">
          <h2>Time complexity</h2>
          {Object.entries(timeComplexity).map(([title, complexity]) => {
            return (
              <p key={title}>
                {title}: {complexity}
              </p>
            );
          })}
        </aside>
      </div>
    </section>
  );
};
