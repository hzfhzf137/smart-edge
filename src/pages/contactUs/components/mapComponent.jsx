// src/pages/contactUs/components/MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const officeCoordinates = { lat: 31.45083439527826, lng: 74.29270038037438 };

const zoom = 13;

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = () => {
  const openInGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${officeCoordinates.lat},${officeCoordinates.lng}`,
      "_blank"
    );
  };

  return (
    <div className="pt-32 pb-16 bg-[#0a0f24] flex flex-col items-center w-screen">
      <h1 className="text-gray-300 text-lg italic mb-4 text-center px-4">
        Tap the marker to view us on Google Maps
      </h1>
      <div className="flex justify-center sticky">
        <MapContainer
          center={officeCoordinates}
          zoom={zoom}
          className="w-[85vw] md:w-[60vw] h-[60vh] rounded-lg shadow-xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={officeCoordinates} icon={defaultIcon}>
            <Popup>
              Smart Edge Office<br />
              Want to open in Google Maps?
              <div className="mt-2 flex justify-center">
                <button
                  onClick={openInGoogleMaps}
                  className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Yes
                </button>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
