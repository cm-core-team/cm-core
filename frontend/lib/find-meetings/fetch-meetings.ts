import axios from "axios";
import { backendRoutes } from "../config";
import { z } from "zod";

const fetchMeetingsSchema = z.object({});

export async function fetchLocalMeetings() {
  const response = axios.get(backendRoutes.getLocalMeetings);
}
