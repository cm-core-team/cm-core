"use client";

export function getUserLocation(options = {}): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    // Get LatLon on page load
    navigator.geolocation.getCurrentPosition(
      (val) => resolve(val.coords),
      reject,
      options,
    );
  });
}
