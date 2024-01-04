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

  localStorage.setItem("sessionToken", res.data.sessionToken);
}
