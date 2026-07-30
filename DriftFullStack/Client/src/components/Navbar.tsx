import { PiFireBold } from "react-icons/pi";
import {
  CORELATIONS,
  ENTRIES,
  INSIGHTS,
  LOG_OUT,
  MAP,
  SEVEN_DAY_STREAK,
} from "../constants/constantVariables";
import AppTitle from "./AppTitle/AppTitle";
const Navbar = () => {
  return (
    <div className="w-full h-20 bg-blue-950 flex flex-row justify-between items-center px-8 font-bold text-2xl text-gray-400">
      {/* Left side section */}
      <div className="flex space-x-20 ">
        <AppTitle />
        <div className="flex space-x-8">
          <p className="cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-8 hover:transition duration-300">
            {ENTRIES}
          </p>
          <p className="cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-8 hover:transition duration-300">
            {MAP}
          </p>
          <p className="cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-8 hover:transition duration-300">
            {CORELATIONS}
          </p>
          <p className="cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-8 hover:transition duration-300">
            {INSIGHTS}
          </p>
        </div>
      </div>

      {/* Right side section */}
      <div className="flex space-x-8">
        <div className="flex space-x-2 text-yellow-500">
          <PiFireBold className="mt-1" />
          <p className="">{SEVEN_DAY_STREAK}</p>
        </div>
        <button className="rounded-full border-2 px-3">{LOG_OUT}</button>
      </div>
    </div>
  );
};

export default Navbar;
