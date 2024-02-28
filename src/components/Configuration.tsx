import { ConfigurationVelocity } from "../types";
import "./styles/Configuration.css";

interface Props {
  changeIsSorting: () => void;
  changeVelocity: ({ velocity }: ConfigurationVelocity) => void;
}

export const Configuration: React.FC<Props> = ({
  changeIsSorting,
  changeVelocity,
}) => {
  const handleSort = () => {
    changeIsSorting();
  };

  const handleChangeVelocity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVelocity = Number(event.target.value);
    changeVelocity({ velocity: newVelocity });
  };

  return (
    <section className="configuration-container">
      <div className="configuration-range">
        <input id="configuration-quantity" type="range" />
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
