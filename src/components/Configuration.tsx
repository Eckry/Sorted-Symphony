import { Block, ConfigurationElements, ConfigurationVelocity } from "../types";
import { RangeInput } from "./RangeInput";
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
    changeIsSorting();
  };

  const handleChangeVelocity = (newVelocity: number) => {
    changeVelocity({ velocity: newVelocity });
  };

  const handleChangeElements = (newElements: number) => {
    changeElements({ elements: newElements });
  };
  
  return (
    <section className="configuration-container">
      <RangeInput
        handleChange={handleChangeElements}
        isSorting={isSorting}
        length={blocks.length}
      />
      <button className="play-sort" onClick={handleSort}>
        II
      </button>
      <RangeInput
        handleChange={handleChangeVelocity}
        isSorting={isSorting}
        length={200 - configuration.velocity}
      />
    </section>
  );
};
