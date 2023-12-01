import fs from "fs";

import { beforeAll, afterAll } from "bun:test";
import { config } from "dotenv";

import { DBClient } from "./pool";

beforeAll(async () => {
  const dotenvPath = ".env.local";
  if (fs.existsSync(dotenvPath)) {
    config({ path: dotenvPath });
  }
});

afterAll(async () => {
  await DBClient.shared.teardown();
});
