import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemCards from "./item-cards";

const MeetingDutiesCard = ({ dutiesData }: { dutiesData: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Duties: </CardTitle>
        <CardDescription>
          These are your upcoming duties/assignments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemCards data={dutiesData} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default MeetingDutiesCard;
