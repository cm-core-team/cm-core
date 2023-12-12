import axios from "axios";
import { describe, expect, it } from "bun:test";
import { backendRoutes } from "frontend/lib/config";
import { ModelGenerator } from "frontend/lib/fixtures/generate";
import {
  congregationSchema,
  Congregation,
} from "frontend/lib/types/congregation.ts";

describe("Congregation CRUD Actions", () => {
  it("should correctly create a congregation", async () => {
    console.log("Using backend URL:");
    console.log(backendRoutes.congregation.create);

    const selectedCongregation = ModelGenerator.instance.randomCongregation();
    const response = await axios.post(
      backendRoutes.congregation.create,
      selectedCongregation,
    );

    // First check backend response matches
    const responseMatch = congregationSchema.safeParse(
      response.data.congregation,
    );

    expect(responseMatch.success).toBe(true);

    const createdCongregation: Congregation = response.data.congregation;

    // Check that the createCongregation matches our selectedCongregation
    expect(createdCongregation.address).toBe(selectedCongregation.address);
    expect(createdCongregation.name).toBe(selectedCongregation.name);
    expect(createdCongregation.phoneNumbers).toEqual(
      selectedCongregation.phoneNumbers,
    );

    // Location attributes
    expect(createdCongregation.lat).toBeTruthy();
    expect(createdCongregation.lon).toBeTruthy();
  });

  it("should correctly identify invalid signatures", async () => {
    const selectedCongregation = ModelGenerator.instance.randomCongregation();
    const response = await axios.post(
      backendRoutes.congregation.create,
      selectedCongregation,
    );

    // First check backend response matches
    const responseMatch = congregationSchema.safeParse(
      response.data.congregation,
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
