import { useState, type ChangeEvent, type FormEvent } from "react";
import Navbar from "../../components/Navbar";
import { upperCase } from "../../utils/utilityFunctions";
import { MdClear } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import type { entryDetailsType } from "./newEntry.types";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import { ENTRY_API } from "../../url/url";
import toast from "react-hot-toast";
import {
  CAPTURE_LOCATION_AND_WEATHER,
  LATITUDE,
  LONGITUDE,
  NEW_ENTRY,
  SAVE_ENTRY,
} from "../../constants/constantVariables";
import { useNavigate } from "react-router-dom";

const NewEntry = () => {
  const navigate = useNavigate();

  const [entryDetails, setEntryDetails] = useState<entryDetailsType>({
    content: "",
    mood: 0,
    lng: 0,
    lat: 0,
  });

  const [locationLoading, setLocationLoading] = useState(false);
  const [isLocationCaptured, setIsLocationCaptured] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setEntryDetails((prev) => ({
      ...prev,
      [name]: name === "mood" ? Number(value) : value,
    }));
  };

  const handleLocation = () => {
    setLocationLoading(true);
    setIsLocationCaptured(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setEntryDetails((prev) => ({
          ...prev,
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        }));

        setLocationLoading(false);
        setIsLocationCaptured(true);
      },
      (error) => {
        console.error("Failed to get the current location : ", error);
        setLocationLoading(false);
        setIsLocationCaptured(false);
        toast.error("Failed to get your location");
      },
    );
  };

  const createEntry = async (entryData: entryDetailsType) => {
    const response = await api.post(ENTRY_API, entryData);
    return response.data;
  };

  const entryMutation = useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      toast.success("Entry Added Successfully");
      navigate("/entries");
    },
    onError: () => {
      toast.error("Failed to Add Entry");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    entryMutation.mutate(entryDetails);
  };

  return (
    <div className="min-h-screen w-full bg-[#020617]">
      <Navbar />
      <div className="flex w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-yellow-50 shadow-2xl">
          <div className="flex items-center justify-between bg-[#020617] p-4 sm:p-6">
            <h1 className="text-2xl text-yellow-50 sm:text-3xl">{NEW_ENTRY}</h1>
            <MdClear
              className="cursor-pointer text-yellow-50"
              size={28}
              onClick={() => navigate("/entries")}
            />
          </div>

          <form className="flex flex-col gap-5 p-4 sm:p-8" onSubmit={handleSubmit}>
            <textarea
              className="min-h-[180px] rounded-md border border-gray-300 bg-white p-4 text-base font-medium text-slate-800 outline-none transition focus:border-gray-500 sm:text-xl"
              name="content"
              value={entryDetails.content}
              rows={8}
              placeholder="what's on your mind, right now, right here ?"
              onChange={handleChange}
            />

            <hr />

            <p className="text-lg font-bold text-gray-600 sm:text-xl">
              {upperCase("Mood")} - {entryDetails.mood}/5
            </p>
            <input
              type="range"
              name="mood"
              value={entryDetails.mood}
              min={1}
              max={5}
              step={1}
              onChange={handleChange}
              className="w-full accent-yellow-600"
            />

            <button
              type="button"
              className="border-4 border-dashed border-gray-300 bg-white p-4 text-sm font-semibold tracking-wider text-slate-700 transition hover:border-yellow-500 sm:text-xl"
              onClick={handleLocation}
              disabled={locationLoading}
            >
              {locationLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
                  <span>Fetching Location...</span>
                </div>
              ) : isLocationCaptured ? (
                <div className="flex flex-col gap-1 text-left text-sm sm:text-base">
                  <h1 className="font-bold">Location Captured Successfully</h1>
                  <p>
                    {LONGITUDE}: {entryDetails.lng}
                  </p>
                  <p>
                    {LATITUDE}: {entryDetails.lat}
                  </p>
                </div>
              ) : (
                <div className="relative flex items-center justify-center gap-2">
                  <FaLocationArrow className="text-sm sm:text-base" />
                  <span>{CAPTURE_LOCATION_AND_WEATHER}</span>
                </div>
              )}
            </button>

            <button
              type="submit"
              className="rounded-md bg-black p-4 text-sm font-bold tracking-wider text-yellow-50 transition hover:bg-slate-800 sm:text-xl"
              disabled={entryMutation.isPending}
            >
              <span className="flex items-center justify-center gap-2">
                <FaArrowRight className="text-sm sm:text-base" />
                {entryMutation.isPending ? "Saving..." : SAVE_ENTRY}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
