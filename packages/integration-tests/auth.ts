import axios from "axios";
import { backendRoutes } from "frontend/lib/config";
import { Congregation } from "frontend/lib/types/congregation";
import { User } from "frontend/lib/types/user";

export async function loginUser(user: User): Promise<string> {
  const res = await axios.post(
    backendRoutes.user.login,
    { email: user.email },
    {
      withCredentials: true,
    },
  );
  const sessionToken: string = res.data.sessionToken;

  return sessionToken;
}

export async function bindAdminToCongregation(
  congregation: Congregation,
  sessionToken: string,
) {
  await axios.post(
    backendRoutes.user.bind,
    {
      congregationId: congregation.id,
    },
    { withCredentials: true, headers: { Authorization: sessionToken } },
  );
}
