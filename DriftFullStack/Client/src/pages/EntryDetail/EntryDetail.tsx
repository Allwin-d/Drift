import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { ENTRY_API } from "../../url/url";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { upperCase } from "../../utils/utilityFunctions";
import type { singleEntryResponseType } from "./entryDetail.types";
import { useState } from "react";
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

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["singleEntry", id],
    queryFn: getSingleEntry,
  });

  console.log("Single Entry Data : ", data);
  console.log("Single Entry page Loading state : ", isLoading);
  console.log("Single Entry page Error state  :", isError);
  console.log(refetch);

  const handleNavigate = () => {
    navigate("/entries");
  };

  const date = new Date();
  const actualDate = date.getDate();
  //   const Day = date.toLocaleString("en-US", { weekday: "long" });
  const Month = date.toLocaleString("en-US", { month: "long" });

  console.log("Delete Entry state : ", deleteEntryVisible);

  const deleteEntry = async (id: string) => {
    const result = api.delete<deleteEntryType>(`${ENTRY_API}/${id}`);
    return result;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteEntry,
    onSuccess: (data) => {
      console.log("successfull Delete Mutation data : ", data);
      toast.success(`${data.data.message}`);
      navigate("/entries");
    },
    onError: () => {
      toast.error("Failed to delete an Entry");
    },
  });

  return (
    <div className="w-full min-h-screen bg-[#020617] flex flex-col items-center ">
      <div className="w-full h-20 bg-blue-950 flex flex-row justify-between items-center px-8 font-bold text-2xl text-gray-400 py-4">
        {/* Left side section */}
        <div
          className="flex space-x-20 relative hover:cursor-pointer"
          onClick={handleNavigate}
        >
          <FaArrowLeftLong className="absolute left-9 top-1" />
          <p>Back to entries</p>
        </div>

        {/* Right side section */}
        <div className="flex space-x-8 relative">
          <button
            className="rounded-md border-4 text-orange-300 border-orange-600 px-10 py-2"
            onClick={() => setDeleteEntryVisible(true)}
          >
            <RiDeleteBin6Line className="absolute left-4 top-4" />
            Delete Entry
          </button>
        </div>
      </div>

      {/*  */}
      <div className="flex flex-col w-2/3 p-20 space-y-11">
        <div className="flex items-center justify-between bg-[#020617]">
          <div className="flex flex-col space-y-8">
            <div className="flex space-x-4 text-2xl">
              <p className="text-yellow-500">{actualDate}</p>
              <p className="text-yellow-500">{upperCase(Month)}</p>
              <p className="text-yellow-500">{data?.data.timeOfDay}</p>
            </div>

            <div className="flex relative space-x-4 text-3xl">
              <FaLocationDot className="text-orange-500 h-10 " />
              <p className="text-orange-50">{data?.data.placeName}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${data?.data.weather.icon}@2x.png`}
            />
            <p className="text-center text-3xl text-orange-50">
              {data?.data.weather.condition}
            </p>
          </div>
        </div>
        <div className=" bg-yellow-50 rounded-lg p-20">
          <p className="text-black font-bold tracking-widest text-2xl">
            {data?.data.content}
          </p>
        </div>
        <div className="p-8">
          <p className="text-green-600 text-2xl text-center">
            {upperCase("Mood")}
            {"🌟".repeat(data?.data?.mood ?? 0)}
          </p>
        </div>
        {deleteEntryVisible ? (
          <div className=" flex flex-col mx-auto bg-gray-900 items-center justify-center rounded-md space-y-8 p-10 ">
            <p className="text-yellow-50 text-2xl">Delete this entry ? </p>
            <p className="text-gray-400 text-xl">
              This can't be undone. The entry and its stamp will be gone for
              good.
            </p>
            <div className="flex justify-between items-center w-full  ">
              <button
                className="text-white bg-orange-600 hover:bg-orange-500 rounded-md px-4 py-2 w-1/3"
                onClick={() => deleteMutation.mutate(id ?? "")}
              >
                Yes, delete
              </button>
              <button
                className="text-gray-400 border-2 px-4 py-2  w-1/3 "
                onClick={() => setDeleteEntryVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default EntryDetail;
