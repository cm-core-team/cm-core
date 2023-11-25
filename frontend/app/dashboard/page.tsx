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
    <div className="flex flex-grow flex-shrink gap-x-2 h-screen">
      <div className="flex flex-col space-y-4 w-full">
        <Card>
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
        <Card>
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
        <Card>
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
      <div className="grid grid-cols-2 w-full">
        <Card className="w-1/2">
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
        <Card className="w-1/2">
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
        <Card className="w-1/2">
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
        <Card className="w-1/2">
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
