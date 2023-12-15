import axios from "axios";
import { describe, expect, it } from "bun:test";
import { backendRoutes } from "frontend/lib/config";
import { ModelGenerator } from "frontend/lib/fixtures/generate";
import { congregationSchema } from "frontend/lib/types/congregation";
import { tokenSchema } from "frontend/lib/types/token";
import { userSchema } from "frontend/lib/types/user";
import { z } from "zod";

const createUserSchema = z.object({
  user: userSchema,
});

const createTokenSchema = z.object({
  token: tokenSchema,
});

describe("Join Token Security", () => {
  // it("should correctly identify correct tokens", async () => {
  //   const adminUser = ModelGenerator.instance.randomUser();
  //   const joinUser = ModelGenerator.instance.randomUser();
  //   const randomCongregation = ModelGenerator.instance.randomCongregation();
  //   // Create a congregation that the admin is linked to
  //   const congregationResponse = await axios.post(
  //     backendRoutes.congregation.create,
  //     randomCongregation,
  //   );
  //   const congregation = z
  //     .object({
  //       congregation: congregationSchema,
  //     })
  //     .parse(congregationResponse.data);
  //   // Create the users
  //   const adminResponse = await axios.post(
  //     backendRoutes.user.create,
  //     adminUser,
  //   );
  //   const joinResponse = await axios.post(backendRoutes.user.create, joinUser);
  //   // Check the response
  //   const adminPayload = createUserSchema.parse(adminResponse.data);
  //   const joinPayload = createUserSchema.parse(joinResponse.data);
  //   expect(adminPayload.user.id).toBeNumber();
  //   expect(joinPayload.user.id).toBeNumber();
  //   // Make the admin create the session token
  //   const tokenResponse = await axios.post(backendRoutes.token.create, {
  //     userId: joinPayload.user.id,
  //     createdByUserId: adminPayload.user.id,
  //   });
  //   const tokenPayload = createTokenSchema.parse(tokenResponse.data);
  //   expect(tokenPayload.token.value).toBeTruthy();
  //   expect(tokenPayload.token.congregationId).toBeNumber();
  //   expect(tokenPayload.token.createdByUserId).toBeNumber();
  //   expect(tokenPayload.token.id).toBeNumber();
  //   tokenPayload.token.value;
  // });
});
