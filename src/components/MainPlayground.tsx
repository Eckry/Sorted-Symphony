import { useSort } from "../hooks/useSort";
import { Blocks } from "./Blocks";
import { Configuration } from "./Configuration";
import { SortOptions } from "./SortOptions";

export const MainPlayground = () => {
  const {
    blocks,
    setBlocks,
    changeIsSorting,
    isSorting,
    changeVelocity,
    changeElements,
    configuration,
  } = useSort();
  return (
    <>
      <div className="home-blocks">
        <Blocks blocks={blocks} />
      </div>
      <SortOptions
        isSorting={isSorting}
        blocks={blocks}
        setBlocks={setBlocks}
      />
      <Configuration
        changeVelocity={changeVelocity}
        changeIsSorting={changeIsSorting}
        changeElements={changeElements}
        blocks={blocks}
        isSorting={isSorting}
        configuration={configuration}
      />
    </>
  );
};
