import { describe, expect, it } from "bun:test";
import { backendRoutes } from "frontend/src/lib/config";
import { ModelGenerator } from "frontend/src/lib/fixtures/generate";
import { CreateCongregationResponse } from "frontend/src/lib/types/api/congregation";
import { CreateSessionTokenResponse } from "frontend/src/lib/types/api/token";
import { CreateUserResponse } from "frontend/src/lib/types/api/user";
import { congregationSchema } from "frontend/src/lib/types/models/congregation";
import { tokenSchema } from "frontend/src/lib/types/models/token";
import { userSchema } from "frontend/src/lib/types/models/user";
import ky from "ky";
import { z } from "zod";

import { bindAdminToCongregation, loginUser } from "../auth";
import { DBClient } from "../pool";

const createUserSchema = z.object({
  user: userSchema,
});

const createTokenSchema = z.object({
  token: tokenSchema,
});

describe("Join Token Security", () => {
  it("should correctly identify correct/incorrect tokens", async () => {
    const adminUser = ModelGenerator.instance.randomUser();
    const joinUser = ModelGenerator.instance.randomUser();
    const randomCongregation = ModelGenerator.instance.randomCongregation();

    // Create a congregation that the admin is linked to
    const congregationResponse = await ky
      .post<CreateCongregationResponse>(backendRoutes.congregation.create, {
        json: randomCongregation,
      })
      .json();
    const congregation = z
      .object({
        congregation: congregationSchema,
      })
      .parse(congregationResponse).congregation;

    // Create the users
    const adminPassword = "hello! worldQ!";
    const adminResponse = await ky
      .post<CreateUserResponse>(backendRoutes.user.create, {
        ...adminUser,
        password: adminPassword,
      })
      .json();

    const joinResponse = await ky
      .post<CreateUserResponse>(backendRoutes.user.create, {
        json: {
          ...joinUser,
          password: "hello,. world/!",
        },
      })
      .json();
    // Check the response
    const adminPayload = createUserSchema.parse(adminResponse);
    const joinPayload = createUserSchema.parse(joinResponse);
    expect(adminPayload.user.id).toBeNumber();
    expect(joinPayload.user.id).toBeNumber();

    // Login the admin
    const sessionToken = await loginUser(adminPayload.user, adminPassword);
    await bindAdminToCongregation(congregation, sessionToken);

    // Make the admin create the session token
    const tokenResponse = await ky
      .post<CreateSessionTokenResponse>(backendRoutes.token.create, {
        json: {
          userEmail: joinPayload.user.email,
          createdByUserId: adminPayload.user.id,
        },
        headers: { Authorization: sessionToken },
      })
      .json();
    const tokenPayload = createTokenSchema.parse(tokenResponse);

    expect(tokenPayload.token.value).toBeTruthy();
    expect(tokenPayload.token.congregationId).toBeNumber();
    expect(tokenPayload.token.createdByUserId).toBeNumber();
    expect(tokenPayload.token.id).toBeNumber();

    const pool = await DBClient.shared.getClient();
    const result = await pool.query("SELECT * FROM tokens WHERE user_id = $1", [
      joinPayload.user.id,
    ]);
    expect(result.rows.length).toBe(1);

    const tokenValue: string = result.rows[0].value;

    const verifyToken = async (val: string) =>
      await ky.post(backendRoutes.user.verifyToken, {
        json: {
          email: joinUser.email,
          tokenValue: val,
        },
      });
    await verifyToken(tokenValue);

    // Incorrect token
    expect(async () => await verifyToken(tokenValue + 1)).toThrow();
  });
});
