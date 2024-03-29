import "./styles/RangeInput.css";

interface Props {
  isSorting: boolean;
  handleChange: (element: number) => void;
  length: number;
}

export const RangeInput: React.FC<Props> = ({
  isSorting,
  handleChange,
  length,
}) => {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newConfiguration = Number(event.target.value);
    handleChange(newConfiguration);
  };

  return (
    <div className="configuration-range">
      <div className="wrapper">
        <input
          disabled={isSorting}
          onChange={handleChangeInput}
          id="configuration-quantity"
          type="range"
          min={10}
          max={200}
          defaultValue={length}
        />
        <div className="rail">
          <div
            className="inner-rail"
            style={{
              width: `calc(${length / 2}% - 5px)`,
            }}
          ></div>
        </div>
        <div className="control-wrapper">
          <div
            style={{ left: `calc(${length / 2}% - 12px)` }}
            className="control-dot"
          ></div>
        </div>
      </div>
      <label htmlFor="configuration-quantity" className="configuration-label">
        Elements
      </label>
    </div>
  );
};
