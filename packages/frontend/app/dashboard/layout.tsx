import { RootNavMenu } from "../../components/nav/root";

import { DashboardNavMenu } from "@/components/nav/dashboard";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardNavMenu />
      {children}
    </section>
  );
}
