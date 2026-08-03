import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Entries = () => {
  const navigate = useNavigate();

  const date = new Date();

  console.log("Day : ", date.toLocaleString("en-US", { weekday: "long" }));
  console.log("Date : ", date.getDate());
  console.log("Month : ", date.toLocaleString("en-US", { month: "long" }));

  const handleNavigate = () => {
    navigate("/entries/new");
  };

  return (
    <div className="w-full h-screen bg-red-300 flex flex-col items-center">
      <Navbar />

      {/* Entries section */}
      <div className="flex flex-col w-3/4 bg-green-600  p-4">
        <div className="flex flex-row justify-between items-center w-full bg-blue-400 p-4">
          <div className="flex flex-col space-y-4 ">
            <p className="text-2xl text-yellow-500">
              {date.toLocaleString("en-US", { weekday: "long" })} ,{" "}
              {date.getDate()} {date.toLocaleString("en-US", { month: "long" })}
            </p>
            <h1 className="text-5xl ">Your entries</h1>
          </div>
          <div>
            <button
              className="bg-yellow-500 px-4 py-2 rounded-md font-bold tracking-widest hover:bg-yellow-400 "
              onClick={handleNavigate}
            >
              New entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
