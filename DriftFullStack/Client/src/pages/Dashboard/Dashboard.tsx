import { findDay, findMonth, sessionRange } from "../../utils/utilityFunctions";
import NewEntryButton from "../../components/NewEntryButton/NewEntryButton";
import Map from "../Map/Map";

import "leaflet/dist/leaflet.css";
// Leaflet map-ku thevaiyana default CSS styles import panrom.

const Dashboard = () => {
  const date = new Date();
  const currentDate = date.getDate();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();

  console.log("currentDAte : ", currentDate);
  console.log("month : ", month);
  console.log("day : ", day);
  console.log("Hour : ", hour);

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-sm text-yellow-50 sm:text-lg">
              <p>Good {sessionRange(hour)}</p>
            </div>

            <div className="flex flex-row items-center justify-center text-black">
              <p className="text-sm text-gray-400 sm:text-lg">
                {findDay(day)}, {currentDate} {findMonth(month)}
              </p>
            </div>
          </div>

          <NewEntryButton />
        </div>

        {/* Streak and Map preview section */}
        <div className="flex h-[300px] flex-row gap-6 sm:px-6 lg:px-8 ">
          <div className="flex flex-1 flex-col bg-gray-600 sm:p-4 lg:p-8 items-start gap-8">
            <div>
              <h1>Streak</h1>
            </div>

            <div className="flex flex-row items-center gap-6 space-x-4">
              <div>
                <p className="p-4 rounded-full border-dashed border-yellow-500 border-2 text-yellow-500 text-sm lg:text-lg  ">
                  7
                </p>
              </div>

              <div>
                <p>Day Streak</p>
                <p>Best: 12 Days</p>
              </div>
            </div>
          </div>

          <div className=" min-w-0 flex-1 overflow-hidden bg-gray-600 sm:p-4 lg:p-8">
            <div className="flex flex-row items-center justify-between">
              <p>Map Preview</p>
              <button className="shrink-0 text-xs font-semibold text-orange-600 transition-colors hover:text-orange-700">
                Open map →
              </button>
            </div>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
