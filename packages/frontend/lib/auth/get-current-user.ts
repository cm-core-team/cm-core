import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";

export async function getCurrentUser(): Promise<any> {
  const res = await axios.get(backendRoutes.user.me, requestOptions());

  return res.data;
}
