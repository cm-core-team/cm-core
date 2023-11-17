import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export default function Page({ className, ...props }: CardProps) {
  return (
    <div className="flex flex-grow flex-shrink flex-basis-auto gap-x-2 h-full">
      <div className="flex flex-col justify-between h-full w-full">
        <Card className="h-1/4">
          <CardHeader>
            <CardTitle>Your Info</CardTitle>
            <CardDescription>Everything about you</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="h-1/4">
          <CardHeader>
            <CardTitle>Your Info</CardTitle>
            <CardDescription>Everything about you</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="h-1/4">
          <CardHeader>
            <CardTitle>Your Info</CardTitle>
            <CardDescription>Everything about you</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Your Info</CardTitle>
            <CardDescription>Everything about you</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
