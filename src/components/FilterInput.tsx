import { useRef } from "react";
import "../App.css";

const FilterInput: React.FC<{ onFilter: (id: string) => void }> = ({
  onFilter,
}) => {
  const numberInputRef = useRef<HTMLInputElement>(null);

  const getSearchId = () => {
    onFilter(numberInputRef.current!.value);
  };

  return (
    <header>
      <input
        placeholder="Filter by Id"
        className="input"
        type="number"
        onChange={getSearchId}
        ref={numberInputRef}
      />
    </header>
  );
};

export default FilterInput;
