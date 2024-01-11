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

const InformationCard = ({ data }: { data: PlaceholderDashboardData[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information Board: </CardTitle>
        <CardDescription>
          Here are any recent congregation announcements.
        </CardDescription>
      </CardHeader>
      {/* Probably put some links to docs here...? */}
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

export default InformationCard;
