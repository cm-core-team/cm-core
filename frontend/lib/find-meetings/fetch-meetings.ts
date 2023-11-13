import axios from "axios";
import { backendRoutes } from "../config";

export async function fetchLocalMeetings() {
  axios.get(backendRoutes.getLocalMeetings);
}
