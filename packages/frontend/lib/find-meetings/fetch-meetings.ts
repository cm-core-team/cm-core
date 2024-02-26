import axios from "axios";
import { z } from "zod";

import { backendRoutes } from "../config";
import { Congregation, congregationSchema } from "../types/models/congregation";

const fetchMeetingsSchema = z.array(congregationSchema.passthrough());

export async function fetchMeetings(
  latitude: number,
  longitude: number,
): Promise<Congregation[]> {
  const response = await axios.post(backendRoutes.getMeetings, {
    latitude: String(latitude),
    longitude: String(longitude),
  });

  // Ensure the response matches our schema
  const meetings = response.data as Congregation[];
  const responseMatch = fetchMeetingsSchema.safeParse(meetings);
  if (!responseMatch.success) {
    throw new Error("Server side error. Please report if this issue persists.");
  }

  return meetings;
}
