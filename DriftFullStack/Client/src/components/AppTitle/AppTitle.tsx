import { PiFeatherLight } from "react-icons/pi";
import { DRIFT } from "../../constants/constantVariables";
import { upperCase } from "../../utils/utilityFunctions";
const AppTitle = () => {
  return (
    <div className="flex space-x-2 text-white text-3xl">
      <PiFeatherLight className="mt-1" />
      <p className="">{upperCase(DRIFT)}</p>
    </div>
  );
};

export default AppTitle;
