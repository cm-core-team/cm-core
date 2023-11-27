import AnimateCard from "@/components/animate-card";
import UserInfoCard from "@/components/user-info-card";
import MeetingDutiesCard from "@/components/meeting-duties-card";
import InformationCard from "@/components/information-card";
import CongEventsCard from "@/components/cong-events-card";
import PublicWitnessingCard from "@/components/public-witnessing-schedule-card";

export default function Page() {
  return (
    <div className="flex flex-grow flex-shrink h-screen">
      <div className="flex gap-4 w-fit">
        <AnimateCard delay={0}>
          <UserInfoCard
            userInfo={{
              name: "John Doe",
              email: "example@gmail.com",
              congregation: "London, Uxbridge",
            }}
          />
        </AnimateCard>
        <AnimateCard delay={0.1}>
          <MeetingDutiesCard />
        </AnimateCard>
        <AnimateCard delay={0.2}>
          <InformationCard />
        </AnimateCard>
        <AnimateCard delay={0.3}>
          <CongEventsCard />
        </AnimateCard>
        <AnimateCard delay={0.4}>
          <PublicWitnessingCard />
        </AnimateCard>
      </div>
    </div>
  );
}
