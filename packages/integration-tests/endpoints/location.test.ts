import axios, { AxiosError } from "axios";
import { describe, it, expect } from "bun:test";
import { backendRoutes } from "frontend/lib/config";
import { ModelGenerator } from "frontend/lib/fixtures/generate";

import { loginUser } from "../auth";

async function getLocationDataAndStatus(query: string) {
  try {
    // Create a random admin user
    const adminUser = ModelGenerator.instance.randomUser();
    const adminPassword = "testpass123";
    await axios.post(backendRoutes.user.create, {
      ...adminUser,
      password: adminPassword,
    });

    const sessionToken = await loginUser(adminUser, "testpass123");
    if (!sessionToken) {
      throw Error(
        "No session token returned? Are the user credentials correct?",
      );
    }

    const res = await axios.get(
      `${backendRoutes.user.findLocation}?q=${query}`,
      {
        headers: { Authorization: `${sessionToken}` },
      },
    );

    return { data: res.data, status: res.status };
  } catch (err) {
    if (err instanceof AxiosError) {
      return { data: err.response?.data, status: err.response?.status };
    }

    return { data: undefined, status: 500 };
  }
}

describe("Location search", async () => {
  it("should return a list of locations", async () => {
    const { data, status } = await getLocationDataAndStatus("hayes");

    console.log(data);

    expect(data).not.toBe(undefined);
    expect(status).toBe(200);
  });

  it("should not find any locations with erroneous query", async () => {
    const { data, status } = await getLocationDataAndStatus(
      // just to make sure it wouldn't find some place at the ends of the earth
      "asldasldalsdaklsdasjkdhas",
    );

    console.log(data);

    expect(data).not.toBe(undefined);
    expect(status).toBe(404);
  });
});
