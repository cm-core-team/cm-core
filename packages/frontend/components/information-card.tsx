import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const InformationCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information Board: </CardTitle>
        <CardDescription>
          Here are any recent congregation announcements.
        </CardDescription>
      </CardHeader>
      {/* Probably put some links to docs here...? */}
      <CardContent>Info goes here</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default InformationCard;
