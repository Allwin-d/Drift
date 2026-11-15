import { useQuery } from "@tanstack/react-query";
import MapView from "../../components/MapView/MapView";
import { fetchUserEntries } from "../../services/fetchUserEntriesService";
import { useState } from "react";

const MAP_ENTRIES_LIMIT = 100;

const MapPage = () => {
  const moods = [1, 2, 3, 4, 5];
  const [moodvalue, setMoodValue] = useState<null | number>(null);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userEntries", "map", MAP_ENTRIES_LIMIT, moodvalue],
    queryFn: () =>
      fetchUserEntries({ limit: MAP_ENTRIES_LIMIT, mood: moodvalue }),
    placeholderData: (previousData) => previousData,
    //this is where we fetch the entries ....
  });

  console.log("Selected Mood value : ", moodvalue);

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#020617]">
      {/* Filter bar: map container-ku veliya, height fixed, shrink aagaadhu */}
      <div className="flex shrink-0 items-center justify-between gap-6 p-2 text-white">
        <div className="flex flex-col items-center justify-between">
          <p>Mood</p>
          <div className="flex flex-row items-center justify-between gap-6">
            {moods.map((mood) => (
              <button
                key={mood}
                className={`cursor-pointer px-2 py-1 rounded-md ${moodvalue === mood ? "bg-yellow-500" : ""} `}
                onClick={() => setMoodValue(mood)}
              >
                {mood}
              </button>
            ))}
            <button onClick={() => setMoodValue(null)}>All</button>
          </div>
        </div>
      </div>

      {/* Map area: meedhi irukkura full space-a edukkum */}
      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-yellow-50">
            Loading map entries...
          </div>
        ) : isError ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-yellow-50">
            <p>Could not load map entries.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-md bg-yellow-500 px-4 py-2 font-semibold text-black"
            >
              Retry
            </button>
          </div>
        ) : (
          <MapView
            entries={data?.data ?? []}
            showLayerToggle
            onResetFilters={
              moodvalue === null ? undefined : () => setMoodValue(null)
            }
            className="h-full w-full"
          />
        )}
      </div>
    </div>
  );
};

export default MapPage;
