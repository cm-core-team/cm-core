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
  memberImg,
}: {
  teamMember: string;
  memberDesc: string;
  memberImg?: string;
}) {
  return (
    <Card className="w-1/4">
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
