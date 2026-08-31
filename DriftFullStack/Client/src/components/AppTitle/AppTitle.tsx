import { PiFeatherLight } from "react-icons/pi";
import { DRIFT } from "../../constants/constantVariables";
import { upperCase } from "../../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";
const AppTitle = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex space-x-2 text-white text-3xl cursor-pointer"
      onClick={() => navigate("/entries")}
    >
      <PiFeatherLight className="mt-1" />
      <p className="">{upperCase(DRIFT)}</p>
    </div>
  );
};

export default AppTitle;
