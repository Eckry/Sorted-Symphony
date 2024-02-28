import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import "./styles/Configuration.css";

interface Props {
  changeIsSorting: () => void;
  changeVelocity: ({ velocity }: ConfigurationVelocity) => void;
  changeElements: ({ elements }: ConfigurationElements) => void;
  blocks: Block[]
}

export const Configuration: React.FC<Props> = ({
  changeIsSorting,
  changeVelocity,
  changeElements,
  blocks
}) => {
  const handleSort = () => {
    changeIsSorting();
  };

  const handleChangeVelocity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVelocity = Number(event.target.value);
    changeVelocity({ velocity: newVelocity });
  };

  const handleChangeElements = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newElements = Number(event.target.value);
    changeElements({ elements: newElements });
  };

  return (
    <section className="configuration-container">
      <div className="configuration-range">
        <input
          onChange={handleChangeElements}
          id="configuration-quantity"
          type="range"
          min={10}
          max={200}
          defaultValue={blocks.length}
        />
        <label htmlFor="configuration-quantity">Elements</label>
      </div>
      <button className="play-sort" onClick={handleSort}>
        II
      </button>
      <div className="configuration-range">
        <input
          onChange={handleChangeVelocity}
          id="configuration-velocity"
          type="range"
          min={1}
          max={100}
        />
        <label htmlFor="configuration-velocity">Velocity</label>
      </div>
    </section>
  );
};
