import axios from "axios";

import { backendRoutes } from "../config";
import { RegisterUserFormData } from "../types/registration/user-form";
import { User, userSchema } from "../types/user";

export async function submitUser(
  userFormData: RegisterUserFormData,
): Promise<User> {
  // This is a Partial<User> because at this time we may not have
  // all the relevant user data like joinToken etc.
  const user: Partial<User> = {
    firstName: userFormData.firstName,
    lastName: userFormData.lastName,
    email: userFormData.email,
    type: userFormData.type,
  };

  const response = await axios.post(backendRoutes.user.create, user);

  return userSchema.parse(response.data.user);
}
