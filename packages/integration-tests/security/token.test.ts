import axios from "axios";
import { describe, expect, it } from "bun:test";
import { backendRoutes } from "frontend/lib/config";
import { ModelGenerator } from "frontend/lib/fixtures/generate";
import { congregationSchema } from "frontend/lib/types/models/congregation";
import { tokenSchema } from "frontend/lib/types/models/token";
import { userSchema } from "frontend/lib/types/models/user";
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
    const congregationResponse = await axios.post(
      backendRoutes.congregation.create,
      randomCongregation,
    );
    const congregation = z
      .object({
        congregation: congregationSchema,
      })
      .parse(congregationResponse.data).congregation;

    // Create the users
    const adminPassword = "hello! worldQ!";
    const adminResponse = await axios.post(backendRoutes.user.create, {
      ...adminUser,
      password: adminPassword,
    });

    const joinResponse = await axios.post(backendRoutes.user.create, {
      ...joinUser,
      password: "hello,. world/!",
    });
    // Check the response
    const adminPayload = createUserSchema.parse(adminResponse.data);
    const joinPayload = createUserSchema.parse(joinResponse.data);
    expect(adminPayload.user.id).toBeNumber();
    expect(joinPayload.user.id).toBeNumber();

    // Login the admin
    const sessionToken = await loginUser(adminPayload.user, adminPassword);
    await bindAdminToCongregation(congregation, sessionToken);

    // Make the admin create the session token
    const tokenResponse = await axios.post(
      backendRoutes.token.create,
      {
        userEmail: joinPayload.user.email,
        createdByUserId: adminPayload.user.id,
      },
      { headers: { Authorization: sessionToken } },
    );
    const tokenPayload = createTokenSchema.parse(tokenResponse.data);

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
      await axios.post(backendRoutes.user.verifyToken, {
        email: joinUser.email,
        tokenValue: val,
      });
    await verifyToken(tokenValue);

    // Incorrect token
    expect(async () => await verifyToken(tokenValue + 1)).toThrow();
  });
});
