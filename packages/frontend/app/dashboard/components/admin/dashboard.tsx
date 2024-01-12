/*
Just for now before I can figure out how to programatically generate these
dashboards based on the user type
*/

"use client";

import React from "react";

import { useRouter } from "next/navigation";

import {
  placeholderCongEvents,
  placeholderInformationBoard,
  placeholderDuties,
} from "../../../../lib/sample-data";
import AnimateCard from "../animate-card";
import CongEventsCard from "../sections/cong-events-card";
import InformationCard from "../sections/information-card";
import MeetingDutiesCard from "../sections/meeting-duties-card";
import PublicWitnessingCard from "../sections/public-witnessing-schedule-card";
import UserInfoCard from "../sections/user-info-card";
import { DashboardComponentProps, RenderDashboardItem } from "../types";

import { DashboardToolbar } from "./toolbar";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AdminDashboard({ currentUser }: DashboardComponentProps) {
  const router = useRouter();

  const renderDashboard = () => {
    const renderDashboardItems: RenderDashboardItem[] = [
      () => (
        <UserInfoCard
          userInfo={{
            name: "John Doe",
            email: "example@gmail.com",
            congregation: "London, Uxbridge",
          }}
        />
      ),
      () => <MeetingDutiesCard data={placeholderDuties} />,
      () => <InformationCard data={placeholderInformationBoard} />,
      () => <CongEventsCard data={placeholderCongEvents} />,
      () => <PublicWitnessingCard />,
    ];

    return (
      <div className="space-y-8">
        <DashboardToolbar />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
          {renderDashboardItems.map((renderDashboardItem, i) => (
            <AnimateCard key={i} delay={i / 10}>
              {renderDashboardItem()}
            </AnimateCard>
          ))}
        </div>
      </div>
    );
  };

  const renderLinkCongregation = () => {
    return (
      <Card className="flex flex-col items-center">
        <CardHeader>
          <CardTitle>
            {currentUser.firstName}, you have not yet linked a congregation.{" "}
          </CardTitle>
          <CardDescription>Click below to link a congregation</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.replace("/register/weekly-meetings")}>
            Register a congregation
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {currentUser.congregation ? renderDashboard() : renderLinkCongregation()}
    </div>
  );
}
