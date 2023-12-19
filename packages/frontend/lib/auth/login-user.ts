import axios from "axios";
import { z } from "zod";

import { backendRoutes } from "../config";
import { LoginUserFormData } from "../types/auth/user-form";

import { isAuthorized } from "./is-authorized";

export async function loginUser(data: LoginUserFormData) {
  await axios.post(backendRoutes.user.login, data);
}
