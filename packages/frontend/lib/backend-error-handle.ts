import { AxiosError } from "axios";
import { ZodError, z } from "zod";

import { userErrors } from "./config";

// The backend should follow this schema of error handling
export const backendErrorSchema = z.object({
  userMsg: z.string(),
});

/**
 * @description Handles errors thrown by Axios.
 *
 * @param error The error to work on.
 *
 * @returns The error message to display to user.
 */
export function backendErrorHandle(error: unknown): string {
  if (error instanceof ZodError) {
    return userErrors.invalidBackendResponse;
  }

  if (error instanceof AxiosError) {
    const result = backendErrorSchema.safeParse(error.response?.data);
    if (!result.success) {
      // TODO: Call a webhook/logger to log this error so we can monitor it.
      return userErrors.invalidBackendResponse;
    }

    return result.data.userMsg;
  }

  return userErrors.unknown;
}
