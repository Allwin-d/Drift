import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// MapContainer, TileLayer, Marker, Popup components-ah import panrom.

import "leaflet/dist/leaflet.css";
// Leaflet map-ku thevaiyana default CSS styles import panrom.

import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import type { userEntriesType } from "../Entries/entries.types";
import { convertToDay } from "../../utils/utilityFunctions";
import { ENTRY_API } from "../../url/url";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useNavigate } from "react-router-dom";
// Custom marker icon create panna Leaflet library-ah import panrom.

// Custom marker icon object create panrom.
const customIcon = new L.Icon({
  // Marker-ku use panna vendiya image URL.
  // Note: URL-ah normal string-ah kudukkanum; Markdown link format use panna koodadhu.
  iconUrl: "https://cdn-icons-png.flaticon.com/128/6735/6735694.png",

  // Popup marker-oda icon position-ai base panni enga open aaganum nu set pannum.
  // x = 0 (horizontal offset), y = -38 (vertical offset).
  popupAnchor: [0, -38],

  // Custom marker image-oda width and height: 40px x 40px.
  iconSize: [40, 40],
});

const Map = () => {
  const navigate = useNavigate();

  const fetchEntries = async () => {
    const result = await api.get<userEntriesType>(ENTRY_API);
    return result.data.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["entries"],
    queryFn: fetchEntries,
  });

  console.log("Entries Data : ", data);
  console.log("Loading,error: ", isLoading, isError);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="w-full h-screen bg-[#020617] flex flex-col items-center">
      <div className="w-full flex-1 min-h-0 overflow-hidden rounded-xl">
        <MapContainer
          // Map open aagumbodhu center-la irukka vendiya latitude, longitude.
          center={[13.0827, 80.2707]}
          // Initial zoom level.
          zoom={6}
          // Mouse scroll wheel use panni map-ah zoom panna disable panrom.
          scrollWheelZoom={true}
          // Map parent container-oda full width and height-ah edukkum.
          // z-0 map-oda stacking order-ah set pannum.
          className="w-full h-full z-0"
        >
          <TileLayer
            // OpenStreetMap-ku attribution / credit display panrom.
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // Map tiles load aagura OpenStreetMap URL.
            // {s}, {z}, {x}, {y} values-ah Leaflet dynamically replace pannum.
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data?.map((entry) => (
            <Marker
              key={entry._id}
              position={[
                entry.location.coordinates[1],
                entry.location.coordinates[0],
              ]}
              icon={customIcon}
            >
              <Popup minWidth={200} maxWidth={250}>
                <div className="flex w-full flex-col  bg-yellow-50 p-2 text-slate-800">
                  {/* Place name */}
                  <div className="flex items-center justify-center gap-2 text-md ">
                    <p className="rounded-full bg-red-600 px-2 py-1 text-white">
                      {entry.weather.tempC}°
                    </p>
                    <p className="break-words text-sm font-semibold leading-5">
                      {entry.placeName}
                    </p>
                  </div>

                  {/* Date and time */}
                  <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                    <p className="text-sm font-semibold leading-5 break-words">
                      {convertToDay(entry.createdAt)}
                    </p>
                    <p className="text-sm font-semibold leading-5 break-words shrink-0">
                      {entry.timeOfDay}
                    </p>
                  </div>

                  {/* Entry content */}
                  <p className="line-clamp-3 break-words text-sm leading-5">
                    {entry.content}
                  </p>

                  {/* Mood and action */}
                  <div className="flex items-center justify-between gap-2 border-t border-yellow-200 pt-2">
                    <span className="rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white">
                      Mood: {entry.mood}
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate(`/entryDetail/${entry._id}`)}
                      className="shrink-0 text-xs font-semibold text-orange-600 transition-colors hover:text-orange-700"
                    >
                      View Entry →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
    // Parent container: full width, 400px height, rounded corners.
    // overflow-hidden na container boundaries-ku veliya content theriyadhu.
  );
};

export default Map;
// Indha Map component-ah vera React component-la import panni use pannalaam.
