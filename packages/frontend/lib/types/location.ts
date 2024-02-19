import { z } from "zod";

export const locationSearchSchema = z.object({
  query: z
    .string()
    .min(1, "Required")
    .max(100, "That location name is way too long!"),
});

export const locationSearchResult = z.object({
  formatted: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  geometry: z.object({ lat: z.number(), lng: z.number() }),
});

export const locationSearchResponse = z.object({
  results: z.array(locationSearchResult),
});

export type LocationSearchFormData = z.infer<typeof locationSearchSchema>;
export type LocationSearchResponse = z.infer<typeof locationSearchResponse>;
