"use client";

import { AxiosRequestConfig } from "axios";

export const requestOptions = (): AxiosRequestConfig => {
  return {
    withCredentials: true,
    headers: {
      Authorization: sessionStorage.getItem("sessionToken"),
    },
  };
};
