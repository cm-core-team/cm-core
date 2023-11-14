import { z } from "zod";
import { tokenSchema } from "./token";

export const userTypeSchema = z.enum(["Admin", "Regular"]);
export const userSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  email: z.string(),
  passwordHash: z.string(),
  type: userTypeSchema,
  congregationId: z.number(),
  joinToken: tokenSchema.optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserType = z.infer<typeof userTypeSchema>;
