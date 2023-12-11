/**
 * The extensions of congregation and user etc. to avoid circular imports.
 */

import { z } from "zod";

import { congregationSchema } from "./congregation";
import { userSchema } from "./user";

export const congregationWithUsersSchema = congregationSchema.extend({
  users: z.array(userSchema),
});

export const userWithCongregationSchema = userSchema.extend({
  congregation: congregationSchema,
});

export type Congregation_WithUsers = z.infer<
  typeof congregationWithUsersSchema
>;
export type User_WithCongregation = z.infer<typeof userWithCongregationSchema>;
