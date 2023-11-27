import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemCards from "./item-cards";

const InformationCard = ({
  informationBoardData,
}: {
  informationBoardData: any;
}) => {
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
        <ItemCards data={informationBoardData} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default InformationCard;
