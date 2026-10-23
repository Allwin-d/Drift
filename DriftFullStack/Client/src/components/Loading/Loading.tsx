import Navbar from "../Navbar";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-[#020617] flex flex-col items-center">
      <Navbar />

      <div className="flex flex-col w-2/4 p-4">
        {/* Header Skeleton */}
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-col space-y-4">
            {/* Date */}
            <div className="h-6 w-48 rounded bg-gray-700 animate-pulse" />

            {/* Your Entries */}
            <div className="h-12 w-72 rounded bg-gray-700 animate-pulse" />
          </div>

          {/* New Entry Button */}
          <div className="h-14 w-40 rounded-md bg-gray-700 animate-pulse" />
        </div>

        {/* Entries Skeleton */}
        <div className="flex flex-col space-y-8 mt-8">
          {/* Total Entries + Sort */}
          <div className="flex flex-row justify-between items-center">
            <div className="h-7 w-40 rounded bg-gray-700 animate-pulse" />
            <div className="h-5 w-32 rounded bg-gray-700 animate-pulse" />
          </div>

          {/* Skeleton Cards */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-800 p-6 rounded-xl"
            >
              {/* Left side */}
              <div className="flex flex-col justify-between h-24 flex-1">
                {/* Location + Time */}
                <div className="flex flex-row space-x-2">
                  <div className="h-4 w-4 rounded-full bg-gray-600 animate-pulse" />

                  <div className="h-4 w-32 rounded bg-gray-600 animate-pulse" />

                  <div className="h-4 w-20 rounded bg-gray-600 animate-pulse" />
                </div>

                {/* Content */}
                <div className="h-6 w-3/4 rounded bg-gray-600 animate-pulse" />

                {/* Mood */}
                <div className="h-4 w-28 rounded bg-gray-600 animate-pulse" />
              </div>

              {/* Weather */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-gray-600 animate-pulse" />

                <div className="h-4 w-10 rounded bg-gray-600 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
