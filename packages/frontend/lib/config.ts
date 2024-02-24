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

export const userErrors = {
  unknown: "Unknown error. Please try again and report if the error persists.",
  invalidBackendResponse:
    "The server sent an invalid response. Please report this if it persists.",
};

export type FeatureItem = {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  href: string;
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus mauris a sapien commodo, quis rutrum magna tincidunt. Suspendisse tempus ut orci a efficitur. Proin vitae ante at ex sagittis gravida. Nullam semper nisl vel blandit fringilla. Donec suscipit enim tellus, ac dignissim lorem porttitor nec.";

export const featureData: FeatureItem[] = [
  {
    title: "Feature 1",
    subtitle: "Manage at light speed.",
    description: loremIpsum,
    color: "secondary",
    href: "#",
  },
  {
    title: "Feature 2",
    subtitle: "Seamless event and member coordination.",
    description: loremIpsum,
    color: "secondary",
    href: "#",
  },
  {
    title: "Feature 3",
    subtitle: "Empower collaboration and communication.",
    description: loremIpsum,
    color: "secondary",
    href: "#",
  },
];
