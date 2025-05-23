export const baseBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * API endpoints
 */
export const backendRoutes = {
  congregation: {
    create: baseBackendUrl + "/congregation/create",
    delete: baseBackendUrl + "/congregation/delete",
    sendVerificationCode:
      baseBackendUrl + "/congregation/send-verification-code",
    verifyPhone: baseBackendUrl + "/congregation/verify-phone",
    informationBoard: {
      add: baseBackendUrl + "/congregation/information-board",
      get: baseBackendUrl + "/congregation/information-board",
    },
  },
  user: {
    create: baseBackendUrl + "/user/create",
    login: baseBackendUrl + "/user/login",
    logout: baseBackendUrl + "/user/logout",
    me: baseBackendUrl + "/user/me",
    bind: baseBackendUrl + "/user/bind",
    verifyToken: baseBackendUrl + "/user/verify-token",
    findLocation: baseBackendUrl + "/user/location",
  },
  token: {
    create: baseBackendUrl + "/token/create",
  },
  getMeetings: baseBackendUrl + "/meetings",
};
