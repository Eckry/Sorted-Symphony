import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import "./styles/Configuration.css";

interface Props {
  changeIsSorting: () => void;
  changeVelocity: ({ velocity }: ConfigurationVelocity) => void;
  changeElements: ({ elements }: ConfigurationElements) => void;
  blocks: Block[];
  isSorting: boolean;
}

export const Configuration: React.FC<Props> = ({
  changeIsSorting,
  changeVelocity,
  changeElements,
  blocks,
  isSorting,
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
        <div className="wrapper">
          <input
            disabled={isSorting}
            onChange={handleChangeElements}
            id="configuration-quantity"
            type="range"
            min={10}
            max={200}
            defaultValue={blocks.length}
          />
          <div className="rail">
            <div
              className="inner-rail"
              style={{ width: `${blocks.length / 2 > 90 ? 90 : blocks.length / 2}%` }}
            ></div>
          </div>
          <div className="control-wrapper">
            <div
              className="control"
              style={{ left: `calc(${blocks.length / 2}% - 3px)` }}
            ></div>
            <div
              style={{ left: `calc(${blocks.length / 2}% + 0.5px)` }}
              className="control-dot"
            ></div>
          </div>
        </div>
        <label htmlFor="configuration-quantity" className="configuration-label">
          Elements
        </label>
      </div>
      <button className="play-sort" onClick={handleSort}>
        II
      </button>
      <div className="configuration-range">
        <input
          disabled={isSorting}
          onChange={handleChangeVelocity}
          id="configuration-velocity"
          type="range"
          min={1}
          max={100}
        />
        <label htmlFor="configuration-velocity" className="configuration-label">
          Velocity
        </label>
      </div>
    </section>
  );
};
