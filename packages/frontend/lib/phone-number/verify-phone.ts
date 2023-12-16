import axios from "axios";

import { backendErrorHandle } from "../backend-error-handle";
import { backendRoutes } from "../config";
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
) {
  try {
    await axios.post(backendRoutes.congregation.verifyPhone, {
      congregation,
      userCode,
    });

    toast({
      title: "Success!",
      description: "The verification code was correct.",
      variant: "success",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: backendErrorHandle(error),
      variant: "destructive",
    });
  }
}
