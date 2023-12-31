import { AdminDashboard } from "./admin-dashboard";
import { UserDashboard } from "./user-dashboard";

function Dashboard({ currentUser }: { currentUser: any }) {
  if (currentUser.type === "REGULAR") {
    console.log("The user is regular woohoo!!");
  }

  // Will retreive the user programatically
  return <UserDashboard />;
}

export { Dashboard };
