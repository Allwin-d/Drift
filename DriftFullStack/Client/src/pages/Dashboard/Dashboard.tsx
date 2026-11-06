import { findDay, findMonth, sessionRange } from "../../utils/utilityFunctions";
import NewEntryButton from "../../components/NewEntryButton/NewEntryButton";
import { useQuery } from "@tanstack/react-query";
import { fetchUserEntries } from "../../services/fetchUserEntriesService";
import { RECENT_ENTRIES } from "../../constants/constantVariables";
import EntryRow from "../../components/EntryRow/EntryRow";
import MapView from "../../components/MapView/MapView";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const date = new Date();
  const currentDate = date.getDate();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();

  const recentLimit = 5;
  const mapLimit = 100;

  const {
    data: recentData,
    isLoading: isRecentLoading,
    isError: isRecentError,
    refetch: refetchRecent,
  } = useQuery({
    queryKey: ["userEntries", "recent", recentLimit],
    queryFn: () => fetchUserEntries({ limit: recentLimit }),
  });
  const {
    data: mapData,
    isLoading: isMapLoading,
    isError: isMapError,
    refetch: refetchMap,
  } = useQuery({
    queryKey: ["userEntries", "map", mapLimit],
    queryFn: () => fetchUserEntries({ limit: mapLimit }),
  });

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-sm text-yellow-50 sm:text-lg">
              <p>Good {sessionRange(hour)}</p>
            </div>

            <div className="flex flex-row items-center justify-center text-black">
              <p className="text-sm text-gray-400 sm:text-lg">
                {findDay(day)}, {currentDate} {findMonth(month)}
              </p>
            </div>
          </div>

          <NewEntryButton />
        </div>

        {/* Streak and Map preview section */}
        <div className="flex h-[300px] flex-row gap-6 sm:px-6 lg:px-8 ">
          <div className="flex flex-1 flex-col bg-gray-600 sm:p-4 lg:p-8 items-start gap-8">
            <div>
              <h1>Streak</h1>
            </div>

            <div className="flex flex-row items-center gap-6 space-x-4">
              <div>
                <p className="p-4 rounded-full border-dashed border-yellow-500 border-2 text-yellow-500 text-sm lg:text-lg  ">
                  7
                </p>
              </div>

              <div>
                <p>Day Streak</p>
                <p>Best: 12 Days</p>
              </div>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-gray-600 p-4 lg:p-8">
            <div className="flex shrink-0 flex-row items-center justify-between">
              <p>Map Preview</p>
              <button
                type="button"
                onClick={() => navigate("/map")}
                className="shrink-0 text-xs font-semibold text-orange-600 transition-colors hover:text-orange-700"
              >
                Open map →
              </button>
            </div>
            <div className="mt-2 flex-1 min-h-0">
              {isMapLoading ? (
                <div className="flex h-full items-center justify-center">
                  Loading map...
                </div>
              ) : isMapError ? (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <p>Could not load map.</p>
                  <button type="button" onClick={() => refetchMap()}>
                    Retry
                  </button>
                </div>
              ) : (
                <MapView
                  entries={mapData?.data ?? []}
                  interactive={false}
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        </div>

        {/* Recent entries section */}
        <div className="flex flex-col mx-auto gap-6 px-4 py-6 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-row items-center justify-between">
            <p>{RECENT_ENTRIES}</p>
            <button
              type="button"
              onClick={() => navigate("/entries")}
              className="shrink-0 text-xs font-semibold text-orange-600 transition-colors hover:text-orange-700"
            >
              View All →
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {isRecentLoading ? (
              <p className="text-gray-400">Loading recent entries...</p>
            ) : isRecentError ? (
              <div className="flex items-center gap-4 text-gray-400">
                <p>Could not load recent entries.</p>
                <button
                  type="button"
                  onClick={() => refetchRecent()}
                  className="text-orange-500 hover:text-orange-400"
                >
                  Retry
                </button>
              </div>
            ) : recentData?.data.length ? (
              recentData.data.map((entry, id) => (
                <EntryRow key={entry._id} entry={entry} id={id} />
              ))
            ) : (
              <p className="text-gray-400">No entries yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
