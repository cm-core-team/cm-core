"use client";

import React from "react";

export function GetWeeklyMeetings() {
  const [userCoords, setUserCoords] = React.useState<GeolocationCoordinates>();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords(position.coords);
    });
  }, []);

  return (
    <>
      <div>{userCoords?.latitude}</div>
      <div>{userCoords?.longitude}</div>
    </>
  );
}