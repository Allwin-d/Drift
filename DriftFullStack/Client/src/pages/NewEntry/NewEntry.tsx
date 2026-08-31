import { useState } from "react";
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEntryDetails((prev) => ({
      ...prev,
      [name]: value,
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
      toast.error("Failed to Add Enty");
    },
  });

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    entryMutation.mutate(entryDetails);
    setEntryDetails({
      content: "",
      mood: 0,
      lng: 0,
      lat: 0,
    });
  };

  console.log("Entry details : ", entryDetails);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#020617]">
        <div className="flex flex-col space-y-4 w-2/6 bg-yellow-50">
          <div className="flex flex-row justify-between items-center bg-[#020617] p-4">
            <h1 className="text-3xl text-yellow-50 ">{NEW_ENTRY}</h1>
            <MdClear
              className="cursor-pointer text-yellow-50"
              size={30}
              onClick={() => navigate("/entries")}
            />
          </div>
          <form
            className="p-10 flex flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <textarea
              className="p-4 text-xl font-bold"
              name="content"
              value={entryDetails.content}
              rows={8}
              cols={8}
              placeholder="what's on your mind, right now, right here ?"
              onChange={handleChange}
            />
            <hr></hr>
            <p className="text-xl font-bold text-gray-600">
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
            />
            <button
              type="button"
              className="border-4 border-dashed p-4 text-xl tracking-wider"
              onClick={handleLocation}
              disabled={locationLoading}
            >
              {locationLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
                  <span>Fetching Location...</span>
                </div>
              ) : isLocationCaptured ? (
                <div className="flex flex-col text-sm">
                  <h1>Location Captured Successfully</h1>
                  <p>
                    {LONGITUDE}: {entryDetails.lng}
                  </p>
                  <p>
                    {LATITUDE}: {entryDetails.lat}
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <FaLocationArrow className="absolute left-36 top-1" />
                  {CAPTURE_LOCATION_AND_WEATHER}
                </div>
              )}
            </button>
            <button
              className="p-4 text-xl tracking-wider bg-black text-yellow-50 rounded-md"
              onClick={() => handleSubmit}
            >
              <span className="relative">
                <FaArrowRight className="absolute left-28 top-1 " />
                {SAVE_ENTRY}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
