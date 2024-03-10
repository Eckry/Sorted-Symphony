import "./styles/Playground.css";
import { Algorithm } from "../types";
import { sortOptions } from "../consts";
import { PlaygroundBlock } from "./PlaygroundBlock";

interface Props {
  algorithmsSelected: Algorithm[];
}

export const Playground: React.FC<Props> = ({ algorithmsSelected }) => {
  return (
    <section className="playground-container">
      <div className="playground-type">
        <span></span>
        <h2>Random</h2>
        <h2>Reversed</h2>
        <h2>Nearly sorted</h2>
        {algorithmsSelected.map((algorithm) => {
          return (
            <>
              <p>{algorithm}</p>
              {Object.values(sortOptions).map((sortOption) => {
                return (
                  <PlaygroundBlock algorithm={algorithm} option={sortOption} />
                );
              })}
            </>
          );
        })}
      </div>
    </section>
  );
};
