import { describe, expect, it } from "bun:test";
import { backendRoutes } from "frontend/src/lib/config";
import { ModelGenerator } from "frontend/src/lib/fixtures/generate";
import ky from "ky";

import { DBClient } from "../pool";

describe("Congregation Phone Verification", () => {
  it("should correctly identify correct codes", async () => {
    const client = await DBClient.shared.getClient();
    const congregation = ModelGenerator.instance.randomCongregation();
    const phoneNumber = congregation.phoneNumbers[0].phone;

    await ky.post(backendRoutes.congregation.sendVerificationCode, {
      json: {
        congregation,
        phoneNumber,
      },
    });

    const result = await client.query(
      "SELECT code FROM congregation_verification_codes WHERE phone_number = $1",
      [phoneNumber],
    );
    expect(result.rows.length).toBe(1);

    const correctCode = result.rows[0].code;
    await ky.post(backendRoutes.congregation.verifyPhone, {
      json: {
        userCode: correctCode,
        congregation,
      },
    });
  });

  it("should correctly identify incorrect codes", async () => {
    const congregation = ModelGenerator.instance.randomCongregation();
    const phoneNumber = congregation.phoneNumbers[0].phone;

    await ky.post(backendRoutes.congregation.sendVerificationCode, {
      json: {
        congregation,
        phoneNumber,
      },
    });

    expect(
      async () =>
        await ky.post(backendRoutes.congregation.verifyPhone, {
          json: {
            userCode: "qjaspkmf1343333", // Should fail
            congregation,
          },
        }),
    ).toThrow();
  });
});
