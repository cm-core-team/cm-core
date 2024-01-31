import { z } from "zod";

export const locationSearchSchema = z.object({
  query: z
    .string()
    .min(1, "Required")
    .max(100, "That location name is way too long!"),
});

export type LocationSearchFormData = z.infer<typeof locationSearchSchema>;
