import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MeetingDutiesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Duties: </CardTitle>
        <CardDescription>
          These are your upcoming duties/assignments.
        </CardDescription>
      </CardHeader>
      <CardContent>Info goes here</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default MeetingDutiesCard;
