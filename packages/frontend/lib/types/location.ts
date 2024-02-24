import { z } from "zod";

export const locationSearchSchema = z.object({
  query: z
    .string()
    .min(1, "Required")
    .max(100, "That location name is way too long!"),
});

export const locationSearchResultSchema = z.object({
  formatted: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  geometry: z.object({ lat: z.number(), lng: z.number() }),
});

export const locationSearchResponse = z.object({
  results: z.array(locationSearchResultSchema),
});

export type LocationSearchFormData = z.infer<typeof locationSearchSchema>;
export type LocationSearchResult = z.infer<typeof locationSearchResultSchema>;
export type LocationSearchResponse = z.infer<typeof locationSearchResponse>;
