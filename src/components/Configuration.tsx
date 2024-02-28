interface Props {
  changeIsSorting: () => void;
}

export const Configuration: React.FC<Props> = ({ changeIsSorting }) => {
  const handleSort = () => {
    changeIsSorting();
  };

  return (
    <section>
      <button onClick={handleSort}>SORT</button>
    </section>
  );
};
