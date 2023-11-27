import axios from "axios";
import { Congregation, congregationSchema } from "../types/congregation";
import { backendRoutes, userErrors } from "../config";
import { backendErrorHandle } from "../backend-error-handle";
import { object, z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { NextRouter } from "next/router";
import { BaseRouter } from "next/dist/shared/lib/router/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const createCongregationResponseSchema = z.object({
  congregation: congregationSchema,
});

export async function createCongregation(
  congregation: Congregation,
  router: AppRouterInstance
) {
  // TODO:
  // - Verify congregation phone number (dummy for DEV environment)
  console.log("Create congregation");
  // NOTE: No need to check if congregation exists as the
  // "Create" button is disabled when congregation is not selected

  try {
    const response = await axios.post(
      backendRoutes.congregation.create,
      congregation
    );
    const objectMatch = createCongregationResponseSchema.safeParse(
      response.data
    );

    if (!objectMatch.success) {
      toast({
        title: "Error",
        description: userErrors.invalidBackendResponse,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Created congregation",
      description: "The congregation has been successfully created.",
      variant: "success",
    });

    router.replace("/register/");
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}
