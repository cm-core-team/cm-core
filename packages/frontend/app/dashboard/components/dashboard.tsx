import { AdminDashboard } from "./admin-dashboard";
import { UserDashboard } from "./user-dashboard";

function Dashboard() {
  // Will retreive the user programatically
  const userType = "admin";

  return userType === "admin" ? <AdminDashboard /> : <UserDashboard />;
}

export { Dashboard };
