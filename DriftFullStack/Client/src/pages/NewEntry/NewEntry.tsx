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
const NewEntry = () => {
  const [entryDetails, setEntryDetails] = useState<entryDetailsType>({
    content: "",
    mood: 0,
    lng: 0,
    lat: 0,
  });

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
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setEntryDetails((prev) => ({
          ...prev,
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        })),
      (error) => console.error("Failed to get the current location : ", error),
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
        <div className="flex flex-col space-y-14 w-2/5 bg-yellow-50 ">
          <div className="flex flex-row justify-between items-center bg-[#020617] p-4">
            <h1 className="text-5xl text-yellow-50 ">{NEW_ENTRY}</h1>
            <MdClear className="cursor-pointer text-yellow-50" size={30} />
          </div>
          <form
            className="p-10 flex flex-col space-y-12"
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
              className="border-4 border-dashed p-4 text-xl tracking-wider "
              onClick={handleLocation}
            >
              <span className="relative">
                <FaLocationArrow className="absolute right-72 top-1 " />
                {CAPTURE_LOCATION_AND_WEATHER}
              </span>
            </button>
            <p>
              {LONGITUDE}
              {entryDetails.lng}
            </p>
            <p>
              {LATITUDE}
              {entryDetails.lat}
            </p>
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
