import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

// create custom icon
const customIcon = new Icon({
   iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  
  iconSize: [38, 38], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

// markers
const markers = [
  {
    geocode: [49.483856, 8.476271],
    popUp: "Filiale nr.1 am Friedrichsplatz, 68165 Mannheim",
    id: 1
  },
  {
    geocode: [49.487209, 8.466780],
    
    popUp: "Filiale nr.2 am  paradaplatz, 68165 Mannheim",
    id:2
  },
  {
    geocode: [49.464390, 8.517260],
    popUp: "Filiale nr.3 , Mannheim  Neuhermsheim",
    id:3
  },
];

export default function Map() {
  return (
    
    <MapContainer center={[49.487457, 8.466040]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
    
  );
}
