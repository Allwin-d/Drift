import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { ENTRY_API } from "../../url/url";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { upperCase } from "../../utils/utilityFunctions";
import type { singleEntryResponseType } from "./entryDetail.types";
import toast from "react-hot-toast";
import type { deleteEntryType } from "./entryDetail.types";

const EntryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteEntryVisible, setDeleteEntryVisible] = useState(false);

  const getSingleEntry = async () => {
    const response = await api.get<singleEntryResponseType>(
      `${ENTRY_API}/${id}`,
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleEntry", id],
    queryFn: getSingleEntry,
    enabled: !!id,
  });

  const handleNavigate = () => {
    navigate("/entries");
  };

  const date = new Date();
  const actualDate = date.getDate();
  const Month = date.toLocaleString("en-US", { month: "long" });

  const deleteEntry = async (id: string) => {
    const result = await api.delete<deleteEntryType>(`${ENTRY_API}/${id}`);
    return result;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteEntry,
    onSuccess: (response) => {
      toast.success(`${response.data.message}`);
      navigate("/entries");
    },
    onError: () => {
      toast.error("Failed to delete an Entry");
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#020617] px-4 text-yellow-50">
        <p className="text-2xl">Loading entry...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#020617] px-4 text-center text-yellow-50">
        <p className="text-3xl font-bold">Entry not found</p>
        <button
          className="mt-6 rounded-md bg-yellow-500 px-6 py-3 text-black"
          onClick={handleNavigate}
        >
          Back to entries
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">
      <div className="flex w-full flex-col justify-between gap-4 bg-blue-950 px-4 py-4 text-lg font-bold text-gray-400 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div
          className="flex cursor-pointer items-center gap-3 hover:text-yellow-500"
          onClick={handleNavigate}
        >
          <FaArrowLeftLong className="text-lg" />
          <p>Back to entries</p>
        </div>

        <button
          className="flex items-center justify-center gap-2 rounded-md border-4 border-orange-600 px-4 py-2 text-orange-300 sm:px-6"
          onClick={() => setDeleteEntryVisible(true)}
        >
          <RiDeleteBin6Line />
          Delete Entry
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-lg bg-[#020617] sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 text-lg text-yellow-500 sm:text-2xl">
              <p>{actualDate}</p>
              <p>{upperCase(Month)}</p>
              <p>{data.data.timeOfDay}</p>
            </div>

            <div className="flex items-center gap-3 text-xl sm:text-3xl">
              <FaLocationDot className="text-orange-500" />
              <p className="break-words text-orange-50">
                {data.data.placeName}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              className="h-16 w-16 sm:h-20 sm:w-20"
              src={`https://openweathermap.org/img/wn/${data.data.weather.icon}@2x.png`}
              alt={data.data.weather.condition || "Weather"}
            />
            <p className="text-center text-lg text-orange-50 sm:text-2xl">
              {data.data.weather.condition}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-6 sm:p-10">
          <p className="break-words text-xl font-bold tracking-widest text-black sm:text-2xl">
            {data.data.content}
          </p>
        </div>

        <div className="p-2 sm:p-4">
          <p className="text-center text-lg text-green-600 sm:text-2xl">
            {upperCase("Mood")} {"⭐".repeat(data.data.mood)}
          </p>
        </div>

        {deleteEntryVisible ? (
          <div className="flex flex-col items-center justify-center rounded-md bg-gray-900 p-6 text-center sm:p-10">
            <p className="text-xl text-yellow-50 sm:text-2xl">
              Delete this entry?
            </p>
            <p className="mt-4 text-sm text-gray-400 sm:text-xl">
              This can't be undone. The entry and its stamp will be gone for
              good.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                className="w-full rounded-md bg-orange-600 px-4 py-2 text-white hover:bg-orange-500 sm:w-1/3"
                onClick={() => deleteMutation.mutate(id ?? "")}
              >
                Yes, delete
              </button>
              <button
                className="w-full rounded-md border-2 border-gray-500 px-4 py-2 text-gray-400 sm:w-1/3"
                onClick={() => setDeleteEntryVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EntryDetail;
