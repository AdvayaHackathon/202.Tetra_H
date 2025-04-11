import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const redMarker = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueMarker = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
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

export default function Map({ position, selectedHotel }) {
  return (
    <div className="w-full h-full">
      <MapContainer 
        center={position} 
        zoom={14} 
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={redMarker}>
          <Popup>
            <div className="font-semibold">Search Location</div>
          </Popup>
        </Marker>
        {selectedHotel && (
          <Marker 
            position={[selectedHotel.lat, selectedHotel.lon]} 
            icon={blueMarker}
          >
            <Popup>
              <div className="font-semibold">{selectedHotel.tags.name || 'Unnamed Location'}</div>
              <div className="text-sm text-gray-600">
                {selectedHotel.tags.tourism === 'hotel' ? 'Hotel' : 
                 selectedHotel.tags.amenity === 'restaurant' ? 'Restaurant' : 
                 selectedHotel.tags.amenity === 'cafe' ? 'Cafe' : 'Other'}
              </div>
              {selectedHotel.tags.phone && (
                <div className="text-sm text-gray-600">
                  📞 {selectedHotel.tags.phone}
                </div>
              )}
            </Popup>
          </Marker>
        )}
        <MapUpdater 
          center={position} 
          zoom={14} 
          selectedHotel={selectedHotel}
        />
      </MapContainer>
    </div>
  );
}