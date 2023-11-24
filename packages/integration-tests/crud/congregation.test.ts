import { describe, expect, it } from "bun:test";
import {
  congregationSchema,
  Congregation,
} from "frontend/lib/types/congregation.ts";
import { backendRoutes } from "frontend/lib/config";
import axios from "axios";

describe("Congregation CRUD Actions", () => {
  it("should correctly create a congregation", async () => {
    console.log("LOOK HERE");
    console.log(backendRoutes.congregation.create);

    const selectedCongregation: Congregation = {
      address: "1 address lane",
      id: 0,
      name: "The absolute Cong",
      phoneNumbers: [
        {
          ext: "+44",
          phone: "7556345",
        },
      ],
      users: [], // No users for now
    };

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
  });

  it("should correctly identify valid/invalid congregations based on signature", async () => {});
});
