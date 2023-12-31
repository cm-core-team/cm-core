"use client";
import { useEffect } from "react";

/*
Just for now before I can figure out how to programatically generate these
dashboards based on the user type
*/
/* eslint-disable react/jsx-key */
import {
  placeholderCongEvents,
  placeholderInformationBoard,
  placeholderDuties,
} from "../../../lib/sample-data";
import { DashboardItems } from "../../../lib/types/dashboard-item";

import AnimateCard from "./animate-card";
import CongEventsCard from "./dashboard-components/cong-events-card";
import InformationCard from "./dashboard-components/information-card";
import MeetingDutiesCard from "./dashboard-components/meeting-duties-card";
import PublicWitnessingCard from "./dashboard-components/public-witnessing-schedule-card";
import UserInfoCard from "./dashboard-components/user-info-card";

function AdminDashboard() {
  const userDashboardItems: DashboardItems = [
    <UserInfoCard
      userInfo={{
        name: "John Doe",
        email: "example@gmail.com",
        congregation: "London, Uxbridge",
      }}
    />,
    <MeetingDutiesCard data={placeholderDuties} />,
    <InformationCard data={placeholderInformationBoard} />,
    <CongEventsCard data={placeholderCongEvents} />,
    <PublicWitnessingCard />,
  ];

  return (
    <div className="flex justify-evenly gap-x-4 mx-4">
      {userDashboardItems.map((dashboardItem, i) => (
        <AnimateCard key={i} delay={i / 10}>
          {dashboardItem}
        </AnimateCard>
      ))}
    </div>
  );
}

export { AdminDashboard };
