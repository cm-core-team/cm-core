import { z } from "zod";

import { userSchema } from "./user";

export const congregationPhoneSchema = z.object({
  ext: z.string(),
  phone: z.string(),
});

export const congregationSchema = z.object({
  id: z.number(),

  name: z.string(),
  address: z.string(),
  signature: z.string().nullable(),

  lat: z.string(),
  lon: z.string(),

  phoneNumbers: z.array(congregationPhoneSchema),
});

export type Congregation = z.infer<typeof congregationSchema>;
export type CongregationPhone = z.infer<typeof congregationPhoneSchema>;
