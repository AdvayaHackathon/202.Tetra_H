"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const redMarker = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({ center, zoom, selectedHotel }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (selectedHotel) {
      map.setView([selectedHotel.lat, selectedHotel.lon], 16);
    }
  }, [selectedHotel, map]);

  return null;
}

export default function Map({name, position, selectedHotel, hotels = [] }) {
  const [mapCenter, setMapCenter] = useState(position || [0, 0]);
  const [mapZoom, setMapZoom] = useState(13);

  useEffect(() => {
    if (position) {
      setMapCenter(position);
      setMapZoom(13);
    }
  }, [position]);

  useEffect(() => {
    if (selectedHotel) {
      setMapCenter([selectedHotel.lat, selectedHotel.lon]);
      setMapZoom(16);
    }
  }, [selectedHotel]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: "100vh", width: "800px" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Main location marker */}
      {position && (
        <Marker position={position} icon={redMarker}>
          <Popup>
            <strong>{name}</strong>
          </Popup>
        </Marker>
      )}

      {/* Hotel markers */}
      {hotels.map((hotel, index) => (
        <Marker
          key={index}
          position={[hotel.lat, hotel.lon]}
          icon={redMarker}
          eventHandlers={{
            click: () => {
              setMapCenter([hotel.lat, hotel.lon]);
              setMapZoom(16);
            },
          }}
        >
          <Popup>
            <div>
              <strong>{hotel.name}</strong>
              <br />
              Rating: {hotel.rating}
              <br />
              Price: ${hotel.price}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Selected hotel marker */}
      {selectedHotel && (
        <Marker 
          position={[selectedHotel.lat, selectedHotel.lon]} 
          icon={blueIcon}
        >
          <Popup>{selectedHotel.name}</Popup>
        </Marker>
      )}

      <MapUpdater center={mapCenter} zoom={mapZoom} selectedHotel={selectedHotel} />
    </MapContainer>
  );
}