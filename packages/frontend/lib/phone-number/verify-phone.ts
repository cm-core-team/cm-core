import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { backendErrorHandle } from "../backend-error-handle";
import { backendRoutes } from "../config";
import { createCongregation } from "../congregation/create-congregation";
import { Congregation } from "../types/congregation";

import { toast } from "@/components/ui/use-toast";

export async function sendVerificationCode(
  congregation: Congregation,
  phoneNumber: string,
) {
  try {
    await axios.post(backendRoutes.congregation.sendVerificationCode, {
      congregation,
      phoneNumber,
    });
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}

export async function verifyPhone(
  congregation: Congregation,
  userCode: string,
  router: AppRouterInstance,
) {
  try {
    await axios.post(backendRoutes.congregation.verifyPhone, {
      congregation,
      userCode,
    });
    await createCongregation(congregation, router);

    toast({
      title: "Success!",
      description: "The verification code was correct.",
      variant: "success",
    });
    router.replace("/dashboard");
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}
