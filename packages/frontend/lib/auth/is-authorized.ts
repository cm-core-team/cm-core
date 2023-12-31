import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";

export async function isAuthorized(): Promise<boolean> {
  try {
    const res = await axios.get(backendRoutes.user.me, requestOptions());
    console.log(res.data);
    return true;
  } catch (error) { }

  return false;
}
