import { z } from "zod";

export const tokenSchema = z.object({
  id: z.number(),
  value: z.string(),
  userId: z.number(),
  userEmail: z.string().email(),
  congregationId: z.number(),
  createdByUserId: z.number(),
});

export type Token = z.infer<typeof tokenSchema>;
