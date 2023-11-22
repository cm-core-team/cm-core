import { beforeAll } from "bun:test";
import dotenv from "dotenv";

beforeAll(() => {
  dotenv.config({ path: ".env.local" });
});
