import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CongEventsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Congregation Events: </CardTitle>
        <CardDescription>Upcoming congregation events.</CardDescription>
      </CardHeader>
      {/* CO visits, assemblies, conventions etc */}
      <CardContent>Info goes here</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CongEventsCard;
