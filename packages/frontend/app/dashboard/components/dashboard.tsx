"use client";

import React from "react";

import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { DashboardComponentProps } from "./types";

import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { getCurrentUserThunk } from "@/lib/stores/dashboard";
import { UserType } from "@/lib/types/user";

const AdminDashboard = dynamic(() =>
  import("./admin-dashboard").then((mod) => mod.AdminDashboard),
);
const UserDashboard = dynamic(() =>
  import("./user-dashboard").then((mod) => mod.UserDashboard),
);

export function Dashboard() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboard);

  React.useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  React.useEffect(() => {
    if (!state.didError) {
      return;
    }

    router.replace("/login");
  }, [state.didError, router]);

  // Map of user type to dashboard component
  const userTypeMap: Record<
    UserType,
    React.ComponentType<DashboardComponentProps>
  > = React.useMemo(() => {
    return { ADMIN: AdminDashboard, REGULAR: UserDashboard };
  }, []);

  const renderDashboard = () => {
    if (state.isLoading || !state.currentUser) {
      return <Spinner />;
    }

    const DashboardComponent = userTypeMap[state.currentUser.type];
    return <DashboardComponent currentUser={state.currentUser} />;
  };

  return <div className="p-4 grid place-items-center">{renderDashboard()}</div>;
}
