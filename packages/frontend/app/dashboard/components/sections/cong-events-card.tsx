import ItemCards from "../item-cards";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceholderDashData } from "@/lib/types/placeholder-dash-data";

const CongEventsCard = ({ data }: { data: PlaceholderDashData[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Congregation Events: </CardTitle>
        <CardDescription>Upcoming congregation events.</CardDescription>
      </CardHeader>
      {/* CO visits, assemblies, conventions etc */}
      <CardContent>
        <ItemCards data={data} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CongEventsCard;
