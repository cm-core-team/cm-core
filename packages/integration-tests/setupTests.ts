import { beforeAll } from "bun:test";
import { config } from "dotenv";
import fs from "fs";

beforeAll(() => {
  const dotenvPath = ".env.local";
  if (fs.existsSync(dotenvPath)) {
    config({ path: dotenvPath });
  }
});
