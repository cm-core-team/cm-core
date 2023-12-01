"use client";

import React from "react";

import { WeeklyMeetingsList } from "./weekly-meetings-list";
import { Button } from "@nextui-org/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  fetchLocalMeetingsThunk,
  localMeetingsSlice,
} from "@/lib/stores/local-meetings";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";

const DynamicMapView = dynamic(
  () => import("./map-view").then((mod) => mod.MapView),
  { ssr: false }
);

const { regroupCongregations, setDisplayCongregations } =
  localMeetingsSlice.actions;

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
    if (!state.localCongregations) {
      return;
    }

    // Whenever localCongregations is modified, we want to compute the groupings
    dispatch(regroupCongregations(state.localCongregations));
  }, [state.localCongregations, dispatch]);

  React.useEffect(() => {
    if (!(userCoords?.latitude && userCoords.longitude)) {
      return;
    }

    // Fetch all local meetings at this location
    dispatch(
      fetchLocalMeetingsThunk({
        latitude: String(userCoords.latitude),
        longitude: String(userCoords.longitude),
      })
    );
  }, [userCoords, dispatch]);

  React.useEffect(() => {
    if (!state.localCongregations) {
      return;
    }

    dispatch(setDisplayCongregations(state.localCongregations));
  }, [state.localCongregations, dispatch]);

  return (
    <div className="grid place-items-center space-y-8 md:p-4 p-1">
      <h2 className="text-2xl">Register a Congregation</h2>

      <div className="grid place-items-center md:grid-cols-2 w-full gap-8">
        <WeeklyMeetingsList />

        <div className="md:grid-rows-2 space-y-16 w-full">
          {userCoords ? (
            <DynamicMapView userCoords={userCoords} />
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
