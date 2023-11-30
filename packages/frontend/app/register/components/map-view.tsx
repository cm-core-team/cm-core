"use client";

import "leaflet/dist/leaflet.css";

import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";

export interface MapViewProps {
  latitude: number;
  longitude: number;
}

export function MapView({ latitude, longitude }: MapViewProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="lg:w-96 lg:h-96 p-4 w-56 h-48 flex mx-auto rounded-lg"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      <Marker position={[latitude, longitude]}>
        <Popup>You are here.</Popup>
      </Marker>
    </MapContainer>
  );
}
