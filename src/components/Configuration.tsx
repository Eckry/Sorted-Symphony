import { isSorted } from "../helpers";
import { PlayIcon, StopIcon } from "../icons";
import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import { RangeInputElements } from "./RangeInputElements";
import { RangeInputVelocity } from "./RangeInputVelocity";
import "./styles/Configuration.css";

interface Props {
  changeIsSorting: () => void;
  changeVelocity: ({ velocity }: ConfigurationVelocity) => void;
  changeElements: ({ elements }: ConfigurationElements) => void;
  blocks: Block[];
  isSorting: boolean;
  configuration: { velocity: number; elements: number };
}

export const Configuration: React.FC<Props> = ({
  changeIsSorting,
  changeVelocity,
  changeElements,
  blocks,
  isSorting,
  configuration,
}) => {
  const handleSort = () => {
    if (!isSorted(blocks)) changeIsSorting();
  };

  const handleChangeVelocity = (newVelocity: number) => {
    changeVelocity({ velocity: newVelocity });
  };

  const handleChangeElements = (newElements: number) => {
    changeElements({ elements: newElements });
  };

  return (
    <section className="configuration-container">
      <RangeInputElements
        handleChange={handleChangeElements}
        isSorting={isSorting}
        length={blocks.length}
      />
      <button className="play-sort" onClick={handleSort}>
        {isSorting ? <StopIcon /> : <PlayIcon />}
      </button>
      <RangeInputVelocity
        handleChange={handleChangeVelocity}
        isSorting={isSorting}
        length={200 - configuration.velocity}
      />
    </section>
  );
};
