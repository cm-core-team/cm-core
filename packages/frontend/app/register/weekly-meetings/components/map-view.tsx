"use client";

import "leaflet/dist/leaflet.css";

import React from "react";

import { Spinner } from "@nextui-org/react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useDispatch, useSelector } from "react-redux";

import { generateKey } from "@/lib/congregation/group-by-coords";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { localMeetingsSlice } from "@/lib/stores/local-meetings";
import { Congregation } from "@/lib/types/congregation";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const { setDisplayCongregations } = localMeetingsSlice.actions;

export function MapView() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.localMeetings);

  const eventHandlers = React.useCallback(
    (meeting: Congregation) => {
      return {
        click: () => {
          const key = generateKey(meeting);
          const groupedCongregations = state.groupedCongregationsByLocation;

          // Set the displayable congregations to the ones that are clicked on
          dispatch(setDisplayCongregations(groupedCongregations[key]));
        },
      };
    },
    [dispatch, state.groupedCongregationsByLocation],
  );

  return (
    <>
      {state.userCoords ? (
        <MapContainer
          center={[state.userCoords.latitude, state.userCoords.longitude]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full md:h-[60vh] h-96 p-4 flex mx-auto rounded"
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
              eventHandlers={eventHandlers(meeting)}
            >
              <Popup className="space-y-8">
                <p className="text-lg">{meeting.name}</p>

                <p className="text-sm opacity-70">{meeting.address}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <Spinner className="flex mx-auto" label="Loading map" />
      )}
    </>
  );
}
