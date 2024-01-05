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
import { PlaceholderDashData } from "@/lib/types/placeholder-dash-data";

const MeetingDutiesCard = ({
  data,
}: {
  data: PlaceholderDashData[] /* | DashData[] */;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Duties: </CardTitle>
        <CardDescription>
          These are your upcoming duties/assignments.
        </CardDescription>
      </CardHeader>
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

export default MeetingDutiesCard;
