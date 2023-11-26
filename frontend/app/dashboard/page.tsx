import { Card } from "@/components/ui/card";
import AnimateCard from "./components/animate-card";
import UserInfoCard from "./components/user-info-card";
import MeetingDutiesCard from "./components/meeting-duties-card";
import InformationCard from "./components/information-card";
import CongEventsCard from "./components/cong-events-card";
import PublicWitnessingCard from "./components/public-witnessing-schedule-card";

type CardProps = React.ComponentProps<typeof Card>;

export default function Page({ className, ...props }: CardProps) {
  return (
    <div className="flex flex-grow flex-shrink h-screen">
      <div className="flex gap-4 w-fit">
        <AnimateCard>
          <UserInfoCard
            userInfo={{
              name: "John Doe",
              email: "example@gmail.com",
              congregation: "London, Uxbridge",
            }}
          />
        </AnimateCard>
        <AnimateCard>
          <MeetingDutiesCard />
        </AnimateCard>
        <AnimateCard>
          <InformationCard />
        </AnimateCard>
        <AnimateCard>
          <CongEventsCard />
        </AnimateCard>
        <AnimateCard>
          <PublicWitnessingCard />
        </AnimateCard>
      </div>
    </div>
  );
}
