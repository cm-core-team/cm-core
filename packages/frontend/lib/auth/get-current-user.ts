import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import {
  User_WithCongregation,
  userWithCongregationSchema,
} from "../types/models/compositions";

export async function getCurrentUser(): Promise<User_WithCongregation> {
  const res = await axios.get(backendRoutes.user.me, requestOptions());
  const parsedUser = userWithCongregationSchema.parse(res.data);

  return parsedUser;
}
