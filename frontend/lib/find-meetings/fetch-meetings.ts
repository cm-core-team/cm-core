import axios from "axios";
import { backendRoutes } from "../config";
import { z } from "zod";

const fetchMeetingsSchema = z.object({});

export async function fetchLocalMeetings(latitude: number, longitude: number) {
  const response = axios({
    method: "GET",
    url: backendRoutes.getLocalMeetings,
    data: {},
  });
}
