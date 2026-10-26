import { useNavigate } from "react-router-dom";
import { NEW_ENTRY } from "../../constants/constantVariables";
import { PiFeatherLight } from "react-icons/pi";

const NewEntryButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/entries/new");
  };

  return (
    <div className="relative w-full sm:w-auto">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-500 px-5 py-3 text-sm font-bold tracking-widest text-black transition-colors duration-700 hover:bg-yellow-400 sm:w-auto sm:text-xl"
        onClick={handleNavigate}
      >
        <PiFeatherLight className="text-base" />
        {NEW_ENTRY}
      </button>
    </div>
  );
};

export default NewEntryButton;
