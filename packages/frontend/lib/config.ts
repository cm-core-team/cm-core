import { PlaceholderDashData } from "./types/placeholder-dash-data";

export const baseBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendRoutes = {
  congregation: {
    create: baseBackendUrl + "/congregation/create",
    delete: baseBackendUrl + "/congregation/delete",
    sendVerificationCode:
      baseBackendUrl + "/congregation/send-verification-code",
    verifyPhone: baseBackendUrl + "/congregation/verify-phone",
    verifyToken: baseBackendUrl + "/user/verify-token",
  },
  user: {
    create: baseBackendUrl + "/user/create",
    login: baseBackendUrl + "/user/login",
    auth: baseBackendUrl + "/user/auth",
  },
  token: {
    create: baseBackendUrl + "/token/create",
  },
  getLocalMeetings: baseBackendUrl + "/meetings",
};

export const userErrors = {
  unknown: "Unknown error. Please try again and report if the error persists.",
  invalidBackendResponse:
    "The server sent an invalid response. Please report this if it persists.",
};

// Just gonna put these here to get them out of my way in the dashboard files
export const placeholderCongEvents: PlaceholderDashData[] = [
  {
    title: "CO Visit",
    content: "Our regular CO visit with brother xyz...",
    date: "11/01/2024",
  },
  {
    title: "CO Visit",
    content: "Our regular CO visit with brother xyz...",
    date: "11/01/2024",
  },
  {
    title: "CO Visit",
    content: "Our regular CO visit with brother xyz...",
    date: "11/01/2024",
  },
];

export const placeholderInformationBoard: PlaceholderDashData[] = [
  {
    title: "Announcement",
    content: "This can be a file, link, or a short description",
    date: "11/01/2024",
  },
  {
    title: "Announcement",
    content: "This can be a file, link, or a short description",
    date: "11/01/2024",
  },
  {
    title: "Announcement",
    content: "This can be a file, link, or a short description",
    date: "11/01/2024",
  },
];

export const placeholderDuties: PlaceholderDashData[] = [
  {
    title: "Microphone",
    content: "Left Microphone, Support back door in case of emergencies",
    date: "11/01/2024",
  },
  {
    title: "Microphone",
    content: "Left Microphone, Support back door in case of emergencies",
    date: "11/01/2024",
  },
  {
    title: "Microphone",
    content: "Left Microphone, Support back door in case of emergencies",
    date: "11/01/2024",
  },
];
