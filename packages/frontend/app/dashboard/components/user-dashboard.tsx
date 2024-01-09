/*
Just for now before I can figure out how to programatically generate these
dashboards based on the user type
*/

import { useRouter } from "next/navigation";

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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UserDashboard({ currentUser }: DashboardComponentProps) {
  const router = useRouter();

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

  const renderDashboard = () => {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
        {userDashboardItems.map((dashboardItem, i) => (
          <AnimateCard key={i} delay={i / 10}>
            {dashboardItem()}
          </AnimateCard>
        ))}
      </div>
    );
  };

  return (
    <div>
      {currentUser.congregation ? (
        renderDashboard()
      ) : (
        <Card className="flex flex-col items-center">
          <CardHeader>
            <CardTitle>
              {currentUser.firstName}, you have not yet linked a congregation.{" "}
            </CardTitle>
            <CardDescription>
              Click below to link a congregation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.replace("/dashboard/link-congregation")}
            >
              Link a congregation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
