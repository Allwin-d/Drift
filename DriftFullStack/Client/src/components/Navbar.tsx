import { PiFireBold } from "react-icons/pi";
import {
  CORELATIONS,
  DASHBOARD,
  ENTRIES,
  INSIGHTS,
  LOG_OUT,
  MAP,
  SEVEN_DAY_STREAK,
} from "../constants/constantVariables";
import AppTitle from "./AppTitle/AppTitle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-blue-950 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between lg:flex-1 lg:gap-6">
          <AppTitle />

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm sm:gap-5 lg:gap-8 lg:text-base">
            <p
              className="cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-8 hover:transition duration-300"
              onClick={() => navigate("/dashboard")}
            >
              {DASHBOARD}
            </p>
            <p
              className="cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-8 hover:transition duration-300"
              onClick={() => navigate("/entries")}
            >
              {ENTRIES}
            </p>
            <p
              className="cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-8 hover:transition duration-300"
              onClick={() => navigate("/map")}
            >
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

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4 lg:items-center">
          <div className="flex items-center gap-2 text-sm text-yellow-500 sm:text-base">
            <PiFireBold className="mt-0.5" />
            <p>{SEVEN_DAY_STREAK}</p>
          </div>
          <button className="rounded-full border-2 border-white/30 px-4 py-2 text-sm text-white transition hover:border-yellow-400 hover:text-yellow-400 sm:text-base">
            {LOG_OUT}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
