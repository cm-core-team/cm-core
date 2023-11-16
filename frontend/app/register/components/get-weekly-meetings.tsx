"use client";

import { fetchLocalMeetings } from "@/lib/find-meetings/fetch-meetings";
import { Congregation } from "@/lib/types/congregation";
import React from "react";
import { WeeklyMeetingsList } from "./weekly-meetings-list";
import { Button } from "@nextui-org/button";

export function GetWeeklyMeetings() {
  const [userCoords, setUserCoords] = React.useState<GeolocationCoordinates>();
  const [localCongregations, setLocalCongregations] =
    React.useState<Congregation[]>();
  const [selectedCongregation, setSelectedCongregation] =
    React.useState<Congregation>();

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

    fetchLocalMeetings(
      String(userCoords.latitude),
      String(userCoords.longitude)
    ).then((congregations) => setLocalCongregations(congregations));
  }, [userCoords]);

  return (
    <div className="grid place-items-center">
      <h2 className="text-2xl">Register a Congregation</h2>
      <WeeklyMeetingsList
        localCongregations={localCongregations}
        setSelectedCongregation={setSelectedCongregation}
      />
      <Button>Create</Button>
    </div>
  );
}
