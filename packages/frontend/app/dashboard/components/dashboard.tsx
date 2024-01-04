"use client";

import React from "react";

import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { AdminDashboard } from "./admin-dashboard";
import { DashboardComponentProps } from "./types";
import { UserDashboard } from "./user-dashboard";

import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { getCurrentUserThunk } from "@/lib/stores/dashboard";
import { UserType } from "@/lib/types/user";

export function Dashboard() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.dashboard);

  const userTypeMap: Record<UserType, React.FC<DashboardComponentProps>> = {
    ADMIN: AdminDashboard,
    REGULAR: UserDashboard,
  };

  React.useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  if (state.didError) {
    router.replace("/login");
    return;
  }

  return (
    <div className="p-4 grid place-items-center">
      {state.isLoading || !state.currentUser ? (
        <Spinner />
      ) : (
        userTypeMap[state.currentUser.type]({
          currentUser: state.currentUser,
        })
      )}
    </div>
  );
}
