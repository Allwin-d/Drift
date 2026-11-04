import { FaLocationDot } from "react-icons/fa6";
import type { entryDetailsType } from "../../pages/Entries/entries.types";
import { useNavigate } from "react-router-dom";
import { entryColor } from "../../constants/constantObjects";

export type entryRowProps = {
  entry: entryDetailsType;
  id: number;
};

const EntryRow = ({ entry, id }: entryRowProps) => {
  const navigate = useNavigate();

  return (
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
        <p className="text-base font-bold text-black">
          {"⭐".repeat(entry.mood)}
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
  );
};

export default EntryRow;
