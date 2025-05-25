import { describe, it, expect } from "bun:test";
import { backendRoutes } from "frontend/src/lib/config";
import { ModelGenerator } from "frontend/src/lib/fixtures/generate";
import {
  LocationSearchResponse,
  locationSearchResponse,
} from "frontend/src/lib/types/api/location";
import ky, { HTTPError } from "ky";

import { loginUser } from "../auth";

async function getLocationDataAndStatus(query: string) {
  // Create a random admin user
  const adminUser = ModelGenerator.instance.randomUser();
  const adminPassword = "testpass123";
  await ky.post(backendRoutes.user.create, {
    json: {
      ...adminUser,
      password: adminPassword,
    },
  });

  const sessionToken = await loginUser(adminUser, "testpass123");
  expect(sessionToken).toBeTruthy();

  const res = await ky.get<LocationSearchResponse>(
    `${backendRoutes.user.findLocation}?q=${query}`,
    {
      headers: { Authorization: `${sessionToken}` },
    },
  );
  const data = locationSearchResponse.parse(await res.json());

  return { data, status: res.status };
}

describe("Location search", async () => {
  it("should return a list of locations", async () => {
    const { data, status } = await getLocationDataAndStatus("hayes");

    expect(data).not.toBe(undefined);
    expect(status).toBe(200);
  });

  it("should not find any locations with erroneous query", async () => {
    // Request should fail and return 404
    expect(async () => {
      await getLocationDataAndStatus(
        // just to make sure it won't find some place at the ends of the earth
        "asldasldalsdaklsdasjkdhas",
      );
    }).toThrow(HTTPError);
  });
});
