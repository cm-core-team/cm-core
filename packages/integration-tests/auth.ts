import { backendRoutes } from "frontend/src/lib/config";
import { LoginResponse } from "frontend/src/lib/types/api/user";
import { Congregation } from "frontend/src/lib/types/models/congregation";
import { User } from "frontend/src/lib/types/models/user";
import ky from "ky";

export async function loginUser(user: User, password: string): Promise<string> {
  const res = await ky
    .post<LoginResponse>(backendRoutes.user.login, {
      json: { email: user.email, password },
      credentials: "include",
    })
    .json();

  const sessionToken: string = res.sessionToken;

  return sessionToken;
}

export async function bindAdminToCongregation(
  congregation: Congregation,
  sessionToken: string,
) {
  await ky.post(backendRoutes.user.bind, {
    json: { congregationId: congregation.id },
    credentials: "include",
    headers: { Authorization: sessionToken },
  });
}
