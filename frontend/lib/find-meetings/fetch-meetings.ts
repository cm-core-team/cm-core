import axios from "axios";
import { backendRoutes } from "../config";
import { z } from "zod";
import { Congregation, congregationSchema } from "../types/congregation";

const fetchMeetingsSchema = z.array(congregationSchema.passthrough());

export async function fetchLocalMeetings(
  latitude: string,
  longitude: string
): Promise<Congregation[]> {
  const response = await axios.post(backendRoutes.getLocalMeetings, {
    latitude: latitude,
    longitude: longitude,
  });

  // Ensure the response matches our schema
  const meetings = response.data as Congregation[];
  const responseMatch = fetchMeetingsSchema.safeParse(meetings);
  if (!responseMatch.success) {
    throw new Error("Server side error. Please report if this issue persists.");
  }

  return meetings;
}
