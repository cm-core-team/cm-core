import { z } from "zod";

import { userTypeSchema } from "../user";

export const registerUserFormSchema = z
  .object({
    firstName: z.string().min(1, "Required").max(512, "Too long"),
    lastName: z.string().min(1, "Required").max(512, "Too long"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Your password should have a minimum of 8 characters")
      .max(50, "Your password should not have more than 50 characters"),
    retypedPassword: z.string(),
    type: userTypeSchema,
  })
  .refine((data) => data.password === data.retypedPassword, {
    message: "Both passwords must match.",
    path: ["retypedPassword"],
  });

export const loginUserFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .max(50, "Your password should not have more than 50 characters"),
});

export type RegisterUserFormData = z.infer<typeof registerUserFormSchema>;
export type LoginUserFormData = z.infer<typeof loginUserFormSchema>;
