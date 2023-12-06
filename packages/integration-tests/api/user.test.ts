import axios from "axios";
import { it, describe, expect } from "bun:test";
import { backendRoutes } from "frontend/lib/config";
import { ModelGenerator } from "frontend/lib/fixtures/generate";
import { User, userSchema } from "frontend/lib/types/user";

import { DBClient } from "../pool";

describe("User CRUD", () => {
  it("should correctly create a user", async () => {
    const client = await DBClient.shared.getClient();
    const user = ModelGenerator.instance.randomUser();
    const response = await axios.post(backendRoutes.user.create, user);

    expect(response.data.user).not.toBe(undefined);

    // Check that the response matches
    const matchResult = userSchema.safeParse(response.data.user);
    expect(matchResult.success).toBeTrue();

    if (!matchResult.success) return;

    const createdUser = matchResult.data;

    expect(createdUser.email).toBe(user.email);
    expect(createdUser.firstName).toBe(user.firstName);
    expect(createdUser.type).toBe(user.type);

    // Check that the user is in the db
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      createdUser.id,
    ]);

    expect(result.rows.length).toBe(1);
    // The SQL uses snake_case instead of camelCase
    const dbUser = result.rows[0];
    expect(dbUser.email).toBe(createdUser.email);
    expect(dbUser.first_name).toBe(createdUser.firstName);
    expect(dbUser.last_name).toBe(createdUser.lastName);
    expect(dbUser.type).toBe(createdUser.type);
  });
});
