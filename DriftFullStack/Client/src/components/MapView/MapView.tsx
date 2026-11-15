import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { HeatLayer as LeafletHeatLayer } from "leaflet.heat";
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
  showLayerToggle?: boolean;
  onResetFilters?: () => void;
  className?: string;
};

type PositionedEntry = {
  entry: entryDetailsType;
  position: [number, number];
};

const MapBounds = ({ entries }: { entries: PositionedEntry[] }) => {
  const map = useMap();

  useEffect(() => {
    const positions = entries.map(({ position }) => position);

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

const HeatLayerRenderer = ({ entries }: { entries: PositionedEntry[] }) => {
  const map = useMap();

  useEffect(() => {
    const points = entries.map(
      ({ position: [lat, lng] }) => [lat, lng, 1] as [number, number, number],
    );
    // leaflet.heat 1.x's Layer declaration is incompatible with the installed Leaflet 1 typings.
    const layer = new LeafletHeatLayer(points, {
      radius: 28,
      blur: 22,
      maxZoom: 12,
      minOpacity: 0.35,
      gradient: {
        0.2: "#668f72",
        0.45: "#e7b648",
        0.75: "#e66d3a",
        1: "#d94835",
      },
    }) as unknown as L.Layer;

    layer.addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [entries, map]);

  return null;
};

const MapView = ({
  entries,
  interactive = true,
  showLayerToggle = false,
  onResetFilters,
  className = "w-full h-full",
}: MapViewProps) => {
  const navigate = useNavigate();
  const [displayMode, setDisplayMode] = useState<"pins" | "heatmap">("pins");
  const positionedEntries = useMemo(
    () =>
      entries.flatMap((entry) => {
        const coordinates = entry.location?.coordinates;
        if (
          !coordinates ||
          coordinates.length < 2 ||
          !Number.isFinite(coordinates[0]) ||
          !Number.isFinite(coordinates[1])
        ) {
          return [];
        }

        return [
          {
            entry,
            position: [coordinates[1], coordinates[0]] as [number, number],
          },
        ];
      }),
    [entries],
  );

  if (positionedEntries.length === 0) {
    return (
      <div
        role="status"
        className={`relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-[#11151f] text-center ${className}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(148, 163, 184, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.035) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      >
        <div className="flex flex-col items-center px-4">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-amber-400 font-mono text-amber-400">
            0
          </div>
          <h2 className="font-serif text-lg text-orange-50">
            No entries match these filters
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Try a wider date range or another mood.
          </p>
          {onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-4 rounded-md bg-amber-400 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-300"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        showLayerToggle
          ? `relative flex h-full min-h-0 w-full flex-col overflow-hidden ${className}`
          : className
      }
    >
      {showLayerToggle && (
        <div className="flex shrink-0 items-center justify-between border-b border-slate-700 bg-[#111722] px-4 py-2">
          <div
            aria-label="Map display mode"
            className="flex items-center rounded-lg border border-slate-700 bg-[#1a2230] p-1"
            role="group"
          >
            {(["pins", "heatmap"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={displayMode === mode}
                onClick={() => setDisplayMode(mode)}
                className={`rounded-md px-4 py-1 text-xs font-medium capitalize transition-colors ${
                  displayMode === mode
                    ? "bg-amber-400 text-slate-950"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {mode === "pins" ? "Pins" : "Heatmap"}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-slate-400">
            {positionedEntries.length} entries
          </span>
        </div>
      )}

      <div className={showLayerToggle ? "min-h-0 flex-1" : "h-full w-full"}>
        <MapContainer
          center={defaultCenter}
          zoom={6}
          dragging={interactive}
          zoomControl={interactive}
          scrollWheelZoom={interactive}
          doubleClickZoom={interactive}
          className="h-full w-full"
        >
          <MapBounds entries={positionedEntries} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {displayMode === "heatmap" && showLayerToggle ? (
            <HeatLayerRenderer entries={positionedEntries} />
          ) : (
            positionedEntries.map(({ entry, position }) => (
              <Marker key={entry._id} position={position} icon={customIcon}>
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
            ))
          )}
        </MapContainer>
      </div>

      {showLayerToggle && displayMode === "heatmap" && (
        <div className="flex shrink-0 items-center gap-2 border-t border-slate-700 bg-[#111722] px-4 py-2 font-mono text-[10px] text-slate-400">
          <span>fewer entries</span>
          <span className="h-2 w-36 rounded-full bg-gradient-to-r from-[#668f72] via-[#e7b648] to-[#d94835]" />
          <span>more entries</span>
        </div>
      )}
    </div>
  );
};

export default MapView;
