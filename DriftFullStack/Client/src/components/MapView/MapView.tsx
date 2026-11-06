import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import type { entryDetailsType } from "../../pages/Entries/entries.types";
import { convertToDay } from "../../utils/utilityFunctions";

import "leaflet/dist/leaflet.css";

const defaultCenter: [number, number] = [13.0827, 80.2707];

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/6735/6735694.png",
  popupAnchor: [0, -38],
  iconSize: [40, 40],
});

type MapViewProps = {
  entries: entryDetailsType[];
  interactive?: boolean;
  className?: string;
};

const MapBounds = ({ entries }: { entries: entryDetailsType[] }) => {
  const map = useMap();

  useEffect(() => {
    const positions = entries
      .map((entry) => entry.location?.coordinates)
      .filter(
        (coordinates): coordinates is number[] =>
          !!coordinates &&
          coordinates.length >= 2 &&
          Number.isFinite(coordinates[0]) &&
          Number.isFinite(coordinates[1]),
      )
      .map(
        (coordinates) =>
          [coordinates[1], coordinates[0]] as [number, number],
      );

    if (positions.length === 0) {
      map.setView(defaultCenter, 6);
    } else if (positions.length === 1) {
      map.setView(positions[0], 12);
    } else {
      map.fitBounds(positions, { padding: [24, 24], maxZoom: 12 });
    }
  }, [entries, map]);

  return null;
};

const MapView = ({
  entries,
  interactive = true,
  className = "w-full h-full",
}: MapViewProps) => {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      dragging={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      className={className}
    >
      <MapBounds entries={entries} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {entries.map((entry) => (
        <Marker
          key={entry._id}
          position={[
            entry.location.coordinates[1],
            entry.location.coordinates[0],
          ]}
          icon={customIcon}
        >
          <Popup minWidth={200} maxWidth={250}>
            <div className="flex w-full flex-col bg-yellow-50 p-2 text-slate-800">
              <div className="flex items-center justify-center gap-2 text-md">
                {entry.weather?.tempC != null && (
                  <p className="rounded-full bg-red-600 px-2 py-1 text-white">
                    {entry.weather.tempC}°
                  </p>
                )}
                <p className="break-words text-sm font-semibold leading-5">
                  {entry.placeName}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                <p className="break-words text-sm font-semibold leading-5">
                  {convertToDay(entry.createdAt)}
                </p>
                <p className="shrink-0 break-words text-sm font-semibold leading-5">
                  {entry.timeOfDay}
                </p>
              </div>

              <p className="line-clamp-3 break-words text-sm leading-5">
                {entry.content}
              </p>

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
  );
};

export default MapView;
