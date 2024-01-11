import { z } from "zod";

export const generateTokenFormSchema = z.object({
  userEmail: z.string().email(),
});

export type GenerateTokenFormData = z.infer<typeof generateTokenFormSchema>;
