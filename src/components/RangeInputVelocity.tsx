import React from "react";
import "./styles/RangeInput.css"

interface Props {
  isSorting: boolean;
  handleChange: (newConfiguration: number) => void;
  length: number;
}

export const RangeInputVelocity: React.FC<Props> = ({
  isSorting,
  handleChange,
  length,
}) => {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newConfiguration = Number(event.target.value);
    handleChange(newConfiguration);
  };

  const rangeMax = 100;
  const rangeMin = 1;

  const percent = (length - rangeMin) / (rangeMax - rangeMin);

  const position = percent * 100;

  const velocityToShow = (1.5 / 99 * length + 48 / 99).toFixed(1)
  // y = mx + b
  // 100 -> 2
  // 1 -> 0.5
  return (
    <div className="configuration-range">
      <input
        disabled={isSorting}
        onChange={handleChangeInput}
        id="configuration-quantity"
        type="range"
        min={rangeMin}
        max={rangeMax}
        defaultValue={length}
      />
      <div className="rail">
        <div
          className="inner-rail"
          style={{
            width: `${position}%`,
          }}
        ></div>
      </div>
      <div className="wrapper">
        <div className="control-wrapper" style={{ left: `${position}%` }}>
          <div className="rangeinput-tooltip">x{velocityToShow}</div>
          <div className="control-dot"></div>
        </div>
      </div>
      <label htmlFor="configuration-quantity" className="configuration-label">
        Velocity
      </label>
    </div>
  );
};
