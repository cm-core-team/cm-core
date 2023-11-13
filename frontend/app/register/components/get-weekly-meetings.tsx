"use client";

import React from "react";

export function GetWeeklyMeetings() {
  const [userCoords, setUserCoords] = React.useState<GeolocationCoordinates>();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords(position.coords);
    });
  }, []);

  return <>{userCoords}</>;
}
