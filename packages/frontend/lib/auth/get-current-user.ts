import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { userSchema, User } from "../types/user";

import { toast } from "@/components/ui/use-toast";

export async function getCurrentUser(): Promise<User> {
  const res = await axios.get(backendRoutes.user.me, requestOptions());

  const parsedUser = userSchema.parse(res.data);

  return parsedUser;
}
