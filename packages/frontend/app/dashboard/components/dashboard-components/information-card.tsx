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

const InformationCard = ({ data }: { data: PlaceholderDashData[] }) => {
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
        <ItemCards data={data} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default InformationCard;
