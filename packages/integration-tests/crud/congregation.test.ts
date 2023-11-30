import { describe, expect, it } from "bun:test";
import {
  congregationSchema,
  Congregation,
} from "frontend/lib/types/congregation.ts";
import { backendRoutes } from "frontend/lib/config";
import { generateCongregation } from "frontend/lib/fixtures/generate-congregation";
import axios from "axios";

describe("Congregation CRUD Actions", () => {
  it("should correctly create a congregation", async () => {
    console.log("LOOK HERE");
    console.log(backendRoutes.congregation.create);

    const selectedCongregation = generateCongregation();
    const response = await axios.post(
      backendRoutes.congregation.create,
      selectedCongregation
    );

    // First check backend response matches
    const responseMatch = congregationSchema.safeParse(
      response.data.congregation
    );

    expect(responseMatch.success).toBe(true);

    const createdCongregation: Congregation = response.data.congregation;

    // Check that the createCongregation matches our selectedCongregation
    expect(createdCongregation.address).toBe(selectedCongregation.address);
    expect(createdCongregation.name).toBe(selectedCongregation.name);
    expect(createdCongregation.phoneNumbers).toEqual(
      selectedCongregation.phoneNumbers
    );

    // Location attributes
    expect(createdCongregation.lat).toBeTruthy();
    expect(createdCongregation.lon).toBeTruthy();
  });

  it("should correctly identify invalid signatures", async () => {
    const selectedCongregation = generateCongregation();
    const response = await axios.post(
      backendRoutes.congregation.create,
      selectedCongregation
    );

    // First check backend response matches
    const responseMatch = congregationSchema.safeParse(
      response.data.congregation
    );
    expect(responseMatch.success).toBe(true);

    const createdCongregation: Congregation = response.data.congregation;
    expect(createdCongregation.signature).toBeTruthy();

    expect(async () => {
      // This should throw because the congregation should already exist
      await axios.post(backendRoutes.congregation.create, selectedCongregation);
    }).toThrow();
  });
});
