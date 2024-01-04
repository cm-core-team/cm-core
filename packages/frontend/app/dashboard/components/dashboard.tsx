"use client";

import React from "react";

import { Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

import { AdminDashboard } from "./admin-dashboard";
import { DashboardComponentProps } from "./types";
import { UserDashboard } from "./user-dashboard";

import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { getCurrentUserThunk } from "@/lib/stores/dashboard";
import { UserType } from "@/lib/types/user";

function Dashboard() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboard);

  const userTypeMap: Record<UserType, React.FC<DashboardComponentProps>> = {
    ADMIN: AdminDashboard,
    REGULAR: UserDashboard,
  };

  React.useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  if (state.isLoading || !state.currentUser) {
    return <Spinner />;
  } else {
    return userTypeMap[state.currentUser.type]({
      currentUser: state.currentUser,
    });
  }
}

export { Dashboard };
