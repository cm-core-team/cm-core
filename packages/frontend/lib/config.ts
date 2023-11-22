export const baseBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendRoutes = {
  congregation: {
    create: baseBackendUrl + "/congregation/create",
  },
  getLocalMeetings: baseBackendUrl + "/meetings",
};
