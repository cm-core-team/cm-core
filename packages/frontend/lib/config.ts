export const baseBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const backendRoutes = {
  congregation: {
    create: baseBackendUrl + "/congregation/create",
    delete: baseBackendUrl + "/congregation/delete",
    sendVerificationCode:
      baseBackendUrl + "/congregation/send-verification-code",
    verifyPhone: baseBackendUrl + "/congregation/verify-phone",
  },
  user: {
    create: baseBackendUrl + "/user/create",
    login: baseBackendUrl + "/user/login",
    me: baseBackendUrl + "/user/me",
    bind: baseBackendUrl + "/user/bind",
    verifyToken: baseBackendUrl + "/user/verify-token",
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
