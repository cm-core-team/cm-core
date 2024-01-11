import ItemCards from "../item-cards";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlaceholderDashboardData } from "@/lib/types/placeholder-dashboard-data";

const CongEventsCard = ({ data }: { data: PlaceholderDashboardData[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Congregation Events: </CardTitle>
        <CardDescription>Upcoming congregation events.</CardDescription>
      </CardHeader>
      {/* CO visits, assemblies, conventions etc */}
      <CardContent>
        <ScrollArea className="h-72">
          <ItemCards data={data} />
          <ScrollBar />
        </ScrollArea>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CongEventsCard;
