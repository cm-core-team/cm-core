"use client";

import "leaflet/dist/leaflet.css";

import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useDispatch, useSelector } from "react-redux";

import { generateKey, groupByCoords } from "@/lib/congregation/group-by-coords";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { localMeetingsSlice } from "@/lib/stores/local-meetings";

export interface MapViewProps {
  userCoords: {
    latitude: number;
    longitude: number;
  };
}

const { setDisplayCongregations } = localMeetingsSlice.actions;

export function MapView({ userCoords }: MapViewProps) {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.localMeetings);

  return (
    <MapContainer
      center={[userCoords.latitude, userCoords.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-96 p-4 flex mx-auto rounded"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      {state.localCongregations.map((meeting, i) => (
        <Marker
          key={i}
          position={[parseFloat(meeting.lat), parseFloat(meeting.lon)]}
          eventHandlers={{
            click: () => {
              const key = generateKey(meeting);
              const groupedCongregations = state.groupedCongregationsByLocation;

              dispatch(setDisplayCongregations(groupedCongregations[key]));
            },
            popupclose: () => {
              dispatch(setDisplayCongregations(state.localCongregations));
            },
          }}
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