import "./styles/SortOptions.css"
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
    <footer className="sortoptions-container">
      <button className="sortoption" onClick={handleRandom}>{sortOptions.RANDOM}</button>
      <button className="sortoption" onClick={handleReversed}>{sortOptions.REVERSED}</button>
      <button className="sortoption" onClick={handleNearlySorted}>{sortOptions.NEARLY_SORTED}</button>
    </footer>
  );
};
