/* eslint-disable react/prop-types */
// src/components/Map.js
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ location }) => {
  const [position, setPosition] = useState(null); // Initialize as null

  useEffect(() => {
    // Fetch coordinates based on the location address
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}`
        );
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([lat, lon]);
        } else {
          console.error("No results found for the location:", location);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (location) {
      fetchCoordinates();
    }
  }, [location]);

  if (!position) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={position}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
