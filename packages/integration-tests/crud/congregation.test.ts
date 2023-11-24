import { describe, expect, it } from "bun:test";
import {
  congregationSchema,
  Congregation,
} from "frontend/lib/types/congregation.ts";
import axios from "axios";

describe("Congregation CRUD Actions", () => {
  it(
    "should correctly create a congregation",
    async () => {
      const createUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/congregation/create";

      console.log("LOOK HERE");
      console.log(createUrl);
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

      const response = await axios.post(createUrl, selectedCongregation);
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
    },
    { timeout: 10000 }
  );
});
