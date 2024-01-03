import { z } from "zod";

import { tokenSchema } from "./token";

export const userTypeSchema = z.enum(["ADMIN", "REGULAR"]);
export const userSchema = z.object({
  id: z.number().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  type: userTypeSchema,
  congregationId: z.number().nullable(),
  joinToken: tokenSchema.nullable(),
});

export type User = z.infer<typeof userSchema>;
export type UserType = z.infer<typeof userTypeSchema>;