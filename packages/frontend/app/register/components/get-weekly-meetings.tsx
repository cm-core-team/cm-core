"use client";

import { fetchLocalMeetings } from "@/lib/find-meetings/fetch-meetings";
import { Congregation } from "@/lib/types/congregation";
import React from "react";
import { WeeklyMeetingsList } from "./weekly-meetings-list";
import { Button } from "@nextui-org/button";
import { MoveRight } from "lucide-react";
import { createCongregation } from "@/lib/find-meetings/create-congregation";
import { useRouter } from "next/navigation";

export function GetWeeklyMeetings() {
  const [userCoords, setUserCoords] = React.useState<GeolocationCoordinates>();
  const [localCongregations, setLocalCongregations] =
    React.useState<Congregation[]>();
  const [selectedCongregation, setSelectedCongregation] =
    React.useState<Congregation>();

  const router = useRouter();

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
    <div className="grid place-items-center space-y-8 md:p-4 p-1">
      <h2 className="text-2xl">Register a Congregation</h2>

      <div className="grid place-items-center md:grid-cols-2 w-full space-y-8">
        <WeeklyMeetingsList
          localCongregations={localCongregations}
          setSelectedCongregation={setSelectedCongregation}
        />

        <Button
          isDisabled={selectedCongregation === undefined}
          className="space-y-8 sm:p-4"
          color="success"
          variant="ghost"
          onClick={(e) => {
            if (!selectedCongregation) {
              return;
            }

            createCongregation(selectedCongregation);
            // Prevent user from clicking again
            e.currentTarget.disabled = true;
          }}
        >
          Create congregation <MoveRight />
        </Button>
      </div>
    </div>
  );
}
