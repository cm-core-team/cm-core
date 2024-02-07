"use client";

import React from "react";

import { Button } from "@nextui-org/button";
import { MoveRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { LocationSearch } from "./location-search";
import { WeeklyMeetingsList } from "./weekly-meetings-list";

import { useScreenWidth } from "@/lib/hooks/screen-width";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { meetingsSlice } from "@/lib/stores/local-meetings";
import { fetchMeetingsThunk } from "@/lib/stores/thunks/fetch-meetings";
import { getUserCoordsThunk } from "@/lib/stores/thunks/get-user-coords";

const DynamicMapView = dynamic(
  () => import("./map-view").then((mod) => mod.MapView),
  { ssr: false },
);

const { regroupCongregations, setDisplayCongregations } = meetingsSlice.actions;

export function GetWeeklyMeetings() {
  const { isSmall } = useScreenWidth();

  const router = useRouter();
  const state = useSelector((state: RootState) => state.meetings);
  // If you do not correctly type your dispatch, then TS may throw an error
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    // Get LatLon on page load
    dispatch(getUserCoordsThunk());
  }, [dispatch]);

  // Whenever localCongregations is modified
  React.useEffect(() => {
    if (!state.localCongregations) {
      return;
    }

    // We want to recompute the groupings
    dispatch(regroupCongregations(state.localCongregations));
    // And set the displayable congregations to our updated ones
    dispatch(setDisplayCongregations(state.localCongregations));
  }, [state.localCongregations, dispatch]);

  React.useEffect(() => {
    if (!(state.userCoords?.latitude && state.userCoords.longitude)) {
      return;
    }

    // Fetch all local meetings at this location
    dispatch(
      fetchMeetingsThunk({
        latitude: String(state.userCoords.latitude),
        longitude: String(state.userCoords.longitude),
      }),
    );
  }, [state.userCoords, dispatch]);

  const renderLocationSearch = () => {
    if (
      !(state.userCoords?.latitude && state.userCoords.longitude) &&
      !state.displayCongregations.length
    )
      return <LocationSearch />;
  };

  return (
    <div className="grid place-items-center space-y-8 md:p-4 p-1">
      <h2 className="text-2xl">Register a Congregation</h2>

      {renderLocationSearch()}

      <div className="grid place-items-center md:grid-cols-2 w-full gap-8">
        {state.displayCongregations.length ? <WeeklyMeetingsList /> : null}

        {state.displayCongregations.length ? (
          <div className="md:grid-rows-2 space-y-16 w-full">
            {!isSmall && <DynamicMapView />}

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
        ) : null}
      </div>
    </div>
  );
}
