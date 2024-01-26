import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { backendRoutes } from "../config";
import { requestOptions } from "../request-options";
import { Congregation, congregationSchema } from "../types/models/congregation";
import { userSchema } from "../types/models/user";

export async function createCongregation(
  congregation: Congregation,
  router: AppRouterInstance,
) {
  // TODO:
  // - Verify congregation phone number (dummy for DEV environment)
  // NOTE: No need to check if congregation exists as the
  // "Create" button is disabled when congregation is not selected

  const createCongregationResponse = await axios.post(
    backendRoutes.congregation.create,
    congregation,
  );
  const createdCongregation = congregationSchema.parse(
    createCongregationResponse.data.congregation,
  );

  // Bind user to their selected congregation
  const bindUserResponse = await axios.post(
    backendRoutes.user.bind,
    {
      congregationId: createdCongregation.id,
    },
    requestOptions(),
  );

  userSchema.parse(bindUserResponse.data);
}
