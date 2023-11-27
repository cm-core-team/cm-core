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
  signature: z.string().optional(),
  phoneNumbers: z.array(congregationPhoneSchema), // JSON string
  users: z.array(userSchema),
});

export type Congregation = z.infer<typeof congregationSchema>;
export type CongregationPhone = z.infer<typeof congregationPhoneSchema>;