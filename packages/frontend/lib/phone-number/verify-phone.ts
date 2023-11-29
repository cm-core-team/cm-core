import axios from "axios";
import { backendRoutes } from "../config";
import { Congregation } from "../types/congregation";
import { backendErrorHandle } from "../backend-error-handle";

export async function sendVerificationCode(congregation: Congregation) {
  try {
    const response = await axios.post(
      backendRoutes.congregation.sendVerificationCode,
      { congregation }
    );
  } catch (error) {
    backendErrorHandle(error);
  }
}

export async function verifyPhone(
  congregation: Congregation,
  userCode: string
) {
  try {
    const response = await axios.post(backendRoutes.congregation.verifyPhone, {
      congregation,
      userCode,
    });
    console.log(response.data);
  } catch (error) {
    console.log(backendErrorHandle(error));
  }
}
