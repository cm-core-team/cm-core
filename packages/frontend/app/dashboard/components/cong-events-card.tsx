import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemCards from "./item-cards";
import { Separator } from "../../../components/ui/separator";

const CongEventsCard = ({ congEventsData }: { congEventsData: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Congregation Events: </CardTitle>
        <CardDescription>Upcoming congregation events.</CardDescription>
      </CardHeader>
      {/* CO visits, assemblies, conventions etc */}
      <CardContent>
        <ItemCards data={congEventsData} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CongEventsCard;
