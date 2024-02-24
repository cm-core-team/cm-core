import { RootNavMenu } from "../../components/nav/root";

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <TooltipProvider>
        <RootNavMenu />
        {children}
      </TooltipProvider>
    </section>
  );
}
