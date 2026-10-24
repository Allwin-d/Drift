import { PiFeatherLight } from "react-icons/pi";
import { DRIFT } from "../../constants/constantVariables";
import { upperCase } from "../../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";

const AppTitle = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex cursor-pointer items-center gap-2 text-xl text-white sm:text-2xl lg:text-3xl"
      onClick={() => navigate("/entries")}
    >
      <PiFeatherLight className="mt-0.5" />
      <p>{upperCase(DRIFT)}</p>
    </div>
  );
};

export default AppTitle;
