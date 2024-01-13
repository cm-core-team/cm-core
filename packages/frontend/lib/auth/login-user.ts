import axios from "axios";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { LoginUserFormData } from "../types/auth/user-form";

export async function loginUser(data: LoginUserFormData) {
  const res = await axios.post(
    backendRoutes.user.login,
    data,
    requestOptions(),
  );

  sessionStorage.setItem("sessionToken", res.data.sessionToken);
}

export async function logoutUser() {
  sessionStorage.removeItem("sessionToken");
  await axios.post(backendRoutes.user.logout, requestOptions());
}
