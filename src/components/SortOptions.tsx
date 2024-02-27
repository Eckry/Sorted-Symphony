import { Block } from "../types";
import { lowShuffle, shuffle } from "../helpers";
import { sortOptions } from "../consts";

interface Props {
  setBlocks: (blocks: Block[]) => void;
  blocks: Block[];
}

export const SortOptions: React.FC<Props> = ({ setBlocks, blocks }) => {
  const handleRandom = () => {
    const newBlocks = shuffle([...blocks]);
    setBlocks(newBlocks);
  };

  const handleReversed = () => {
    const newBlocks = [...blocks];
    newBlocks.sort((a, b) => b.val - a.val);
    setBlocks(newBlocks);
  };

  const handleNearlySorted = () => {
    const newBlocks = lowShuffle([...blocks]);
    setBlocks(newBlocks);
  };

  return (
    <div>
      <button onClick={handleRandom}>{sortOptions.RANDOM}</button>
      <button onClick={handleReversed}>{sortOptions.REVERSED}</button>
      <button onClick={handleNearlySorted}>{sortOptions.NEARLY_SORTED}</button>
    </div>
  );
};
