import axios from "axios";
import { z } from "zod";

import { backendRoutes } from "../config";
import { LoginUserFormData } from "../types/auth/user-form";

export async function loginUser(data: LoginUserFormData) {
  const response = await axios.post(backendRoutes.user.login, data);
  const responseSchema = z.object({ sessionToken: z.string() });

  const sessionToken = responseSchema.parse(response.data).sessionToken;
  localStorage.setItem("sessionToken", sessionToken);
}
