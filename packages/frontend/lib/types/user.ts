import { z } from "zod";
import { tokenSchema } from "./token";

export const userTypeSchema = z.enum(["Admin", "Regular"]);
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  type: userTypeSchema,
  congregationId: z.number(),
  joinToken: tokenSchema.optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserType = z.infer<typeof userTypeSchema>;
