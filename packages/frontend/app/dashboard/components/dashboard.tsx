"use client";

import React from "react";

import { Spinner } from "@nextui-org/react";
import axios from "axios";

import { AdminDashboard } from "./admin-dashboard";
import { UserDashboard } from "./user-dashboard";

import { backendRoutes } from "@/lib/config";
import { requestOptions } from "@/lib/request-options";

function Dashboard() {
  const [currentUser, setCurrentUser] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getCurrentUser = () => {
    axios
      .get(backendRoutes.user.me, requestOptions())
      .then((res) => {
        console.log(res.data);
        setCurrentUser({ ...res.data });
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  // I hate react for this
  React.useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) {
    return <Spinner />;
  } else {
    return currentUser.type === "REGULAR" ? (
      <UserDashboard currentUser={currentUser} />
    ) : (
      <AdminDashboard currentUser={currentUser} />
    );
  }
}

export { Dashboard };
