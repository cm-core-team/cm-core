"use client";

import React from "react";

import { WeeklyMeetingsList } from "./weekly-meetings-list";
import { Button } from "@nextui-org/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchLocalMeetingsThunk } from "@/lib/stores/local-meetings";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { MapView } from "./map-view";
import { Spinner } from "@nextui-org/react";

export function GetWeeklyMeetings() {
  const [userCoords, setUserCoords] = React.useState<GeolocationCoordinates>();

  const router = useRouter();
  const state = useSelector((state: RootState) => state.localMeetings);
  // If you do not correctly type your dispatch, then TS may throw an error
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    // Get LatLon on page load
    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords(position.coords);
    });
  }, []);

  React.useEffect(() => {
    // Get all the local congregations around latitude and longitude
    if (!(userCoords?.latitude && userCoords.longitude)) {
      return;
    }

    dispatch(
      fetchLocalMeetingsThunk({
        latitude: String(userCoords.latitude),
        longitude: String(userCoords.longitude),
      })
    );
  }, [userCoords, dispatch]);

  return (
    <div className="grid place-items-center space-y-8 md:p-4 p-1">
      <h2 className="text-2xl">Register a Congregation</h2>

      <div className="grid place-items-center md:grid-cols-2 w-full space-y-8">
        <WeeklyMeetingsList />

        <div className="md:grid-rows-2 space-y-16">
          {userCoords ? (
            <MapView
              latitude={userCoords.latitude}
              longitude={userCoords.longitude}
            />
          ) : (
            <Spinner className="flex mx-auto" label="Loading map" />
          )}

          <Button
            isDisabled={state.selectedCongregation === undefined}
            className="space-y-8 sm:p-4 flex justify-center mx-auto"
            color="success"
            variant="ghost"
            onClick={(e) => {
              if (!state.selectedCongregation) {
                return;
              }

              router.replace("/register/phone-number");
            }}
          >
            Create Congregation <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
