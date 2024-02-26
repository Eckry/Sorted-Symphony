import { Block } from "../types";
import { shuffle } from "../helpers";

interface Props {
  setBlocks: (blocks: Block[]) => void;
  blocks: Block[];
}

export const SortOptions: React.FC<Props> = ({ setBlocks, blocks }) => {
  const handleRandom = () => {
    const newBlocks = shuffle([...blocks]);
    setBlocks(newBlocks);
  };

  return (
    <div>
      <button onClick={handleRandom}>Random</button>
      <button>Reversed</button>
      <button>Nearly sorted</button>
    </div>
  );
};
