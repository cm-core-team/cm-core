"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import { Dashboard } from "./components/dashboard";

import { backendRoutes } from "@/lib/config";
import { requestOptions } from "@/lib/request-options";

export default function Page() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCurrentUser = () => {
    console.log("getting the current user");
    console.log(backendRoutes.user.me);
    console.log(requestOptions());

    axios
      .get(backendRoutes.user.me, requestOptions())
      .then((res) => {
        console.log(res.data);
        setCurrentUser({ ...res.data });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    console.log("use effect running");
    getCurrentUser();
  }, []);

  console.log(currentUser);

  if (!isLoading && currentUser) {
    return <Dashboard currentUser={currentUser} />;
  } else {
    return;
  }
}
