import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TeamMemberCard({
  teamMember,
  memberDesc,
}: {
  teamMember: string;
  memberDesc: string;
}) {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>
          <h3>{teamMember}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>{memberDesc}</div>
      </CardContent>
    </Card>
  );
}
