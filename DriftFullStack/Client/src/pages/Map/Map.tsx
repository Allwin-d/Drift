import { useQuery } from "@tanstack/react-query";
import MapView from "../../components/MapView/MapView";
import { fetchUserEntries } from "../../services/fetchUserEntriesService";

const MAP_ENTRIES_LIMIT = 100;

const MapPage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userEntries", "map", MAP_ENTRIES_LIMIT],
    queryFn: () => fetchUserEntries({ limit: MAP_ENTRIES_LIMIT }),
  });

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#020617]">
      <div className="w-full flex-1 min-h-0 overflow-hidden rounded-xl">
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
            className="h-full w-full"
          />
        )}
      </div>
    </div>
  );
};

export default MapPage;
