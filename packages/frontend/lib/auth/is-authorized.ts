import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";

export async function isAuthorized(): Promise<boolean> {
  try {
    await axios.get(backendRoutes.user.me, requestOptions());
    return true;
  } catch (error) {}

  return false;
}
