import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { ENTRY_API } from "../../url/url";
import { FaLocationDot } from "react-icons/fa6";
import { MdCloudOff } from "react-icons/md";
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

  const handleNavigate = () => {
    navigate("/entries/new");
  };

  const fetchUserEntries = async () => {
    try {
      const response = await api.get<userEntriesType>(ENTRY_API);
      return response.data;
    } catch (err) {
      console.log("Failed to fetch User Entries : ", err);
      throw err;
    }
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userEntries"],
    queryFn: fetchUserEntries,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#020617] text-white">
        <Navbar />

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-gray-700 animate-pulse" />
              <div className="h-12 w-56 rounded bg-gray-700 animate-pulse sm:w-72" />
            </div>

            <div className="h-14 w-full rounded-md bg-gray-700 animate-pulse sm:w-40" />
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="h-7 w-32 rounded bg-gray-700 animate-pulse" />
              <div className="h-5 w-20 rounded bg-gray-700 animate-pulse" />
            </div>

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-xl bg-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-gray-600 animate-pulse" />
                    <div className="h-4 w-28 rounded bg-gray-600 animate-pulse" />
                    <div className="h-4 w-16 rounded bg-gray-600 animate-pulse" />
                  </div>
                  <div className="h-6 w-3/4 rounded bg-gray-600 animate-pulse" />
                  <div className="h-4 w-24 rounded bg-gray-600 animate-pulse" />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="h-12 w-12 rounded-full bg-gray-600 animate-pulse" />
                  <div className="h-4 w-10 rounded bg-gray-600 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full bg-[#020617]">
        <Navbar />
        <div className="flex min-h-[75vh] flex-col items-center justify-center space-y-8 px-4 text-center">
          <MdCloudOff className="text-7xl text-orange-600 sm:text-8xl" />
          <p className="text-2xl text-yellow-50 sm:text-3xl">
            Couldn't load your entries
          </p>
          <p className="text-lg text-gray-400 sm:text-2xl">
            Check your connection and try again.
          </p>
          <button
            className="rounded-lg bg-orange-600 px-4 py-2 text-base text-white transition duration-700 hover:bg-orange-400 sm:text-xl"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">
      <Navbar />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2 sm:space-y-4">
            <p className="text-lg text-yellow-500 sm:text-2xl">
              {date.toLocaleString("en-US", { weekday: "long" })} ,{" "}
              {date.getDate()} {date.toLocaleString("en-US", { month: "long" })}
            </p>
            <h1 className="text-2xl font-bold text-yellow-50 sm:text-3xl">
              {YOUR_ENTRIES}
            </h1>
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-md bg-yellow-500 px-5 py-3 text-sm font-bold tracking-widest text-black transition-colors duration-700 hover:bg-yellow-400 sm:w-auto sm:text-xl"
              onClick={handleNavigate}
            >
              <PiFeatherLight className="text-base" />
              {NEW_ENTRY}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg text-yellow-50 sm:text-2xl">
              {TOTAL_ENTRIES} {data?.data.length ?? 0}
            </h1>
            <p className="text-sm text-gray-300 sm:text-xl">
              {data?.data.length ? SORTED_DESC : ""}
            </p>
          </div>

          {data?.data.length ? (
            data.data.map((entry, id) => (
              <div
                className={`flex cursor-pointer flex-col gap-4 rounded-xl bg-yellow-50 p-4 shadow-lg transition duration-300 hover:scale-[1.01] sm:flex-row sm:items-center sm:justify-between sm:p-6 ${entryColor[id + 1]}`}
                key={entry._id}
                onClick={() => navigate(`/entryDetail/${entry._id}`)}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 sm:text-base">
                    <FaLocationDot className="text-red-600" />
                    <p className="tracking-wider">{entry.placeName}</p>
                    <p className="tracking-wider">({entry.timeOfDay})</p>
                  </div>

                  <p className="break-words text-lg font-bold tracking-wider sm:text-xl text-black">
                    {entry.content}
                  </p>
                  <p className="text-base font-bold">
                    {"??".repeat(entry.mood)}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 sm:flex-col">
                  <img
                    src={`https://openweathermap.org/img/wn/${entry.weather.icon}@2x.png`}
                    alt={entry.weather.condition || "Weather"}
                    className="h-14 w-14 sm:h-16 sm:w-16"
                  />
                  <p className="text-base font-medium sm:text-lg text-black">
                    {Math.floor(entry.weather.tempC)}°C
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 rounded-md border-2 border-dashed border-gray-600 bg-[#020617] p-10 text-center sm:p-16">
              <PiFeatherLight className="text-7xl text-yellow-600 sm:text-8xl" />
              <p className="text-2xl text-yellow-50 sm:text-3xl">
                No entries yet
              </p>
              <p className="text-lg text-gray-400 sm:text-2xl">
                Your first stamp is waiting to happen
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Entries;
