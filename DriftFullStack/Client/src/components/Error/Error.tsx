import Navbar from "../Navbar";
import { MdCloudOff } from "react-icons/md";

const Error = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] space-y-14  ">
        <MdCloudOff className="text-orange-600 text-8xl" />
        <p className="text-yellow-50 text-3xl">Couldn't load your entries</p>
        <p className="text-gray-400 text-2xl">
          Check your connection and try again.
        </p>
      </div>
    </div>
  );
};

export default Error;
