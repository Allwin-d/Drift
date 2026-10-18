import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// MapContainer, TileLayer, Marker, Popup components-ah import panrom.

import "leaflet/dist/leaflet.css";
// Leaflet map-ku thevaiyana default CSS styles import panrom.

import L from "leaflet";
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
  return (
    // Parent container: full width, 400px height, rounded corners.
    // overflow-hidden na container boundaries-ku veliya content theriyadhu.
    <div className="w-full h-[400px] overflow-hidden rounded-xl">
      <MapContainer
        // Map open aagumbodhu center-la irukka vendiya latitude, longitude.
        center={[51.505, -0.09]}
        // Initial zoom level.
        zoom={13}
        // Mouse scroll wheel use panni map-ah zoom panna disable panrom.
        scrollWheelZoom={false}
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

        <Marker
          // Map-la marker display aagura coordinates.
          position={[51.505, -0.09]}
          // Default pin-ku badhila namma custom image-ah use panrom.
          icon={customIcon}
        >
          <Popup>
            {/* Marker-ah click pannumbodhu popup message display aagum. */}
            <p>Current Location</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
// Indha Map component-ah vera React component-la import panni use pannalaam.
