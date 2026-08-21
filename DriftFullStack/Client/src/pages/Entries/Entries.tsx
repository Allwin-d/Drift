import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { ENTRY_API } from "../../url/url";
import { FaLocationDot } from "react-icons/fa6";
import { PiFeatherLight } from "react-icons/pi";
import type { userEntriesType } from "./entries.types";
import { entryColor } from "../../constants/constantObjects";
import {
  NEW_ENTRY,
  SORTED_DESC,
  TOTAL_ENTRIES,
  YOUR_ENTRIES,
} from "../../constants/constantVariables";

const Entries = () => {
  const navigate = useNavigate();

  const date = new Date();

  console.log("Day : ", date.toLocaleString("en-US", { weekday: "long" }));
  console.log("Date : ", date.getDate());
  console.log("Month : ", date.toLocaleString("en-US", { month: "long" }));

  const handleNavigate = () => {
    navigate("/entries/new");
  };

  const fetchUserEntries = async () => {
    try {
      const response = await api.get<userEntriesType>(ENTRY_API);
      return response.data;
    } catch (err) {
      console.log("Failed to fetch User Entries : ", err);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userEntries"],
    queryFn: fetchUserEntries,
  });

  console.log("User Entries Data : ", data);
  console.log("Loading State from Entries page :", isLoading);
  console.log("Error state from Entries page : ", isError);

  return (
    <div className="w-full h-screen bg-[#020617] flex flex-col items-center">
      <Navbar />

      {/* Entries section */}
      <div className="flex flex-col w-2/4 bg-[#020617]  p-4">
        <div className="flex flex-row justify-between items-center w-full bg-[#020617] ">
          <div className="flex flex-col space-y-4 ">
            <p className="text-2xl text-yellow-500">
              {date.toLocaleString("en-US", { weekday: "long" })} ,{" "}
              {date.getDate()} {date.toLocaleString("en-US", { month: "long" })}
            </p>
            <h1 className="text-5xl font-bold text-yellow-50 ">
              {YOUR_ENTRIES}
            </h1>
          </div>
          <div className="relative">
            <button
              className="p-3 bg-yellow-500 text-black rounded-md font-bold tracking-widest transition-colors duration-700 hover:bg-yellow-400 px-8 text-xl"
              onClick={handleNavigate}
            >
              {NEW_ENTRY}
            </button>
            <PiFeatherLight className="absolute text-black bottom-4 left-2" />
          </div>
        </div>
        {/* User Entries section */}
        <div className="flex flex-col space-y-8 mt-8">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl text-yellow-50 ">
              {TOTAL_ENTRIES} {data?.data.length}{" "}
            </h1>
            <p className="text-xl text-gray-300">{SORTED_DESC}</p>
          </div>

          {data?.data.map((entry, id) => (
            <div
              className={`flex justify-between items-center bg-yellow-50 p-6 rounded-xl shadow-lg ${entryColor[id + 1]} transition duration-300 hover:scale-105 cursor-pointer `}
              key={id}
            >
              <div className="flex flex-col justify-between h-24 ">
                <div className="flex flex-row space-x-2 text-gray-500 font-medium">
                  <FaLocationDot className="mt-1 text-red-600" />
                  <p className="tracking-wider">{entry.placeName}</p>
                  <p className="tracking-wider">({entry.timeOfDay})</p>
                </div>

                <p className="font-bold text-xl tracking-wider">
                  {entry.content}
                </p>
                <p className="font-bold">{"🌟".repeat(entry.mood)}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${entry.weather.icon}@2x.png`}
                />
                <p>{Math.floor(entry.weather.tempC)}°C</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Entries;
