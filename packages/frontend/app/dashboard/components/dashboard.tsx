import AnimateCard from "./animate-card";
import CongEventsCard from "./cong-events-card";
import InformationCard from "./information-card";
import MeetingDutiesCard from "./meeting-duties-card";
import PublicWitnessingCard from "./public-witnessing-schedule-card";
import UserInfoCard from "./user-info-card";

// Just creating some placeholder data for testing purposes
const congEventsData = [
  {
    title: "CO Visit",
    content: "Our regular CO visit with brother xyz...",
    date: "11/01/2024",
  },
  {
    title: "CO Visit",
    content: "Our regular CO visit with brother xyz...",
    date: "11/01/2024",
  },
  {
    title: "CO Visit",
    content: "Our regular CO visit with brother xyz...",
    date: "11/01/2024",
  },
];

const congInformationBoardData = [
  {
    title: "Announcement",
    content: "This can be a file, link, or a short description",
    date: "11/01/2024",
  },
  {
    title: "Announcement",
    content: "This can be a file, link, or a short description",
    date: "11/01/2024",
  },
  {
    title: "Announcement",
    content: "This can be a file, link, or a short description",
    date: "11/01/2024",
  },
];

const dutiesData = [
  {
    title: "Microphone",
    content: "Left Microphone, Support back door in case of emergencies",
    date: "11/01/2024",
  },
  {
    title: "Microphone",
    content: "Left Microphone, Support back door in case of emergencies",
    date: "11/01/2024",
  },
  {
    title: "Microphone",
    content: "Left Microphone, Support back door in case of emergencies",
    date: "11/01/2024",
  },
];

function Dashboard() {
  return (
    <div className="flex justify-evenly gap-x-4 mx-4">
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
        <MeetingDutiesCard dutiesData={dutiesData} />
      </AnimateCard>
      <AnimateCard delay={0.2}>
        <InformationCard informationBoardData={congInformationBoardData} />
      </AnimateCard>
      <AnimateCard delay={0.3}>
        <CongEventsCard congEventsData={congEventsData} />
      </AnimateCard>
      <AnimateCard delay={0.4}>
        <PublicWitnessingCard />
      </AnimateCard>
    </div>
  );
}

export { Dashboard };
