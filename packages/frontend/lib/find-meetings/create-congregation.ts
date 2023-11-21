import { Congregation } from "../types/congregation";

export async function createCongregation(congregation: Congregation) {
  // TODO:
  // - Create backend POST create congregation endpoint
  // - Verify congregation phone number (dummy for DEV environment)
  // - Call the create congregation endpoint
  console.log("Create congregation");
  // NOTE: No need to check if congregation exists as the
  // "Create" button is disabled when congregation is not selected
}
