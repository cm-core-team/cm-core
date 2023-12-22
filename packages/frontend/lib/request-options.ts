"use client";

import { AxiosRequestConfig } from "axios";

export const requestOptions = (): AxiosRequestConfig => {
  return {
    withCredentials: true,
    headers: { Authorization: localStorage.getItem("sessionToken") },
  };
};
