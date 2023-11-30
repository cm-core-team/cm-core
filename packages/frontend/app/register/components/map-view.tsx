"use client";

import "leaflet/dist/leaflet.css";

import { Congregation } from "@/lib/types/congregation";

import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { RootState } from "@/lib/stores/app-store";
import { useSelector } from "react-redux";

export interface MapViewProps {
  userCoords: {
    latitude: number;
    longitude: number;
  };
}

export function MapView({ userCoords }: MapViewProps) {
  const state = useSelector((state: RootState) => state.localMeetings);

  return (
    <MapContainer
      center={[userCoords.latitude, userCoords.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="lg:w-96 lg:h-96 p-4 w-56 h-48 flex mx-auto rounded"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      {(state.localCongregations ?? []).map((meeting, i) => (
        <Marker
          position={[parseFloat(meeting.lat), parseFloat(meeting.lon)]}
          key={i}
        >
          <Popup className="space-y-8">
            <p className="text-lg">{meeting.name}</p>

            <p className="text-sm opacity-70">{meeting.address}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
