import { z } from "zod";

export const tokenSchema = z.object({
  id: z.number(),
  tokenValue: z.string(),
  userId: z.number(),
  congregationId: z.number(),
  createdByUserId: z.number(),
});

export type Token = z.infer<typeof tokenSchema>;
