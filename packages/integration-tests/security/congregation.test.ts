import axios from "axios";
import { describe, expect, it } from "bun:test";
import { backendRoutes } from "frontend/lib/config";
import { ModelGenerator } from "frontend/lib/fixtures/generate";

import { DBClient } from "../pool";

describe("Congregation Phone Verification", () => {
  it("should correctly identify correct codes", async () => {
    const client = await DBClient.shared.getClient();
    const congregation = ModelGenerator.instance.randomCongregation();
    const phoneNumber = congregation.phoneNumbers[0].phone;

    await axios.post(backendRoutes.congregation.sendVerificationCode, {
      congregation,
      phoneNumber,
    });

    const result = await client.query(
      "SELECT code FROM congregation_verification_codes WHERE phone_number = $1",
      [phoneNumber],
    );
    expect(result.rows.length).toBe(1);

    const correctCode = result.rows[0].code;
    await axios.post(backendRoutes.congregation.verifyPhone, {
      userCode: correctCode,
      congregation,
    });
  });

  it("should correctly identify incorrect codes", async () => {
    const congregation = ModelGenerator.instance.randomCongregation();
    const phoneNumber = congregation.phoneNumbers[0].phone;

    await axios.post(backendRoutes.congregation.sendVerificationCode, {
      congregation,
      phoneNumber,
    });

    expect(
      async () =>
        await axios.post(backendRoutes.congregation.verifyPhone, {
          userCode: "qjaspkmf1343333", // Should fail
          congregation,
        }),
    ).toThrow();
  });
});
