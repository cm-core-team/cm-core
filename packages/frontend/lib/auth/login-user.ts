import axios from "axios";

import { backendRoutes } from "../config";
import { LoginUserFormData } from "../types/auth/user-form";

export async function loginUser(data: LoginUserFormData) {
  await axios.post(backendRoutes.user.login, data, { withCredentials: true });
}
