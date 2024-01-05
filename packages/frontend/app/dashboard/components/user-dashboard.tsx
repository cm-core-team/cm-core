/*
Just for now before I can figure out how to programatically generate these
dashboards based on the user type
*/

import {
  placeholderCongEvents,
  placeholderInformationBoard,
  placeholderDuties,
} from "../../../lib/sample-data";

import AnimateCard from "./animate-card";
import CongEventsCard from "./sections/cong-events-card";
import InformationCard from "./sections/information-card";
import MeetingDutiesCard from "./sections/meeting-duties-card";
import PublicWitnessingCard from "./sections/public-witnessing-schedule-card";
import UserInfoCard from "./sections/user-info-card";
import { DashboardComponentProps, DashboardItem } from "./types";

export function UserDashboard({ currentUser }: DashboardComponentProps) {
  const userDashboardItems: DashboardItem[] = [
    () => (
      <UserInfoCard
        key=""
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
    <div className="flex justify-evenly gap-x-4 mx-4">
      {userDashboardItems.map((dashboardItem, i) => (
        <AnimateCard key={i} delay={i / 10}>
          {dashboardItem()}
        </AnimateCard>
      ))}
    </div>
  );
}
