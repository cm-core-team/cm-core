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

  // This gets the current user from the backend
  // and then sets it to some local state
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(backendRoutes.user.me, requestOptions());

      setCurrentUser({ ...res.data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
