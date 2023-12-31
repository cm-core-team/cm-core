"use client";

import { AxiosRequestConfig } from "axios";

export const requestOptions = (): AxiosRequestConfig => {
  console.log(localStorage.getItem("sessionToken"));

  return {
    withCredentials: true,
    headers: {
      Authorization: localStorage.getItem("sessionToken"),
    },
  };
};
