import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { locationSearchResponse } from "../types/location";

export async function getLocationResults() {
  try {
    const res = await axios.get(
      backendRoutes.user.findLocation,
      requestOptions(),
    );

    const parsedLocationResults = locationSearchResponse.parse(res.data);
    return parsedLocationResults;
  } catch (err) {
    throw err;
  }
}
