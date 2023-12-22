import { AdminDashboard } from "./admin-dashboard";
import { UserDashboard } from "./user-dashboard";

import { GetWeeklyMeetings } from "@/app/register/weekly-meetings/components/get-weekly-meetings";

function Dashboard() {
  // Will retreive the user programatically
  const userType = "admin";
  const user = { type: "admin", congregation: "" };

  if (!user.congregation && user.type === "admin") {
    return <GetWeeklyMeetings />;
  }

  return userType === "admin" ? <AdminDashboard /> : <UserDashboard />;
}

export { Dashboard };
