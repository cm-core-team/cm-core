import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { locationSearchResponse } from "../types/location";

export async function getLocationResults(query: string) {
  try {
    const res = await axios.get(
      `${backendRoutes.user.findLocation}?q=${query}`,
      requestOptions(),
    );

    const parsedLocationResults = locationSearchResponse.parse(res.data);
    return parsedLocationResults;
  } catch (err) {
    throw err;
  }
}
