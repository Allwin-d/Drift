import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { upperCase } from "../../utils/utilityFunctions";
import { MdClear } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const NewEntry = () => {
  const [mood, setMood] = useState<string | number>(3);
  const [position, setPostion] = useState<Record<string, string | number>>({
    lat: "",
    long: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setPostion({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }),
        (error) =>
          console.error("Failed to get the current location : ", error),
      );
    }
  }, []);

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-screen  bg-blue-950">
        <div className="flex flex-col space-y-14 w-2/4 bg-yellow-50 ">
          <div className="flex flex-row justify-between items-center bg-blue-950 p-4">
            <h1 className="text-5xl text-yellow-50 ">New Entry</h1>
            <MdClear className="cursor-pointer text-yellow-50" size={30} />
          </div>
          <div className="p-10 flex flex-col space-y-12">
            <textarea
              className="p-4 text-xl font-bold"
              rows={8}
              cols={8}
              placeholder="what's on your mind, right now, right here ?"
            />
            <hr></hr>
            <p className="text-xl font-bold text-gray-600">
              {upperCase("Mood")} - {mood}/5
            </p>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={mood}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMood(e.target.value)
              }
            />
            <button className="border-4 border-dashed p-4 text-xl tracking-wider ">
              <span className="relative">
                <FaLocationArrow className="absolute right-72 top-1 " />
                Capture location & weather
              </span>
            </button>
            <p>Latitude{position.lat}</p>
            <p>Longitude{position.long}</p>
            <button className="p-4 text-xl tracking-wider bg-black text-yellow-50 rounded-md">
              <span className="relative">
                <FaArrowRight className="absolute left-28 top-1 " />
                Save Entry
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
