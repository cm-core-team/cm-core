import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            <div className="flex flex-col space-y-2">
              <span>Name: John Doe</span>
              <span>Email: johndoe@gmail.com</span>
              <span>Congregation: London, Uxbridge</span>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Your Information</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Your Information</DialogTitle>
                  <DialogDescription>
                    Make changes to your information here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="John Doe"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue="example@gmail.com"
                      className="col-span-3"
                      type="email"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="congregation" className="text-right">
                      Congregation
                    </Label>
                    <HoverCard>
                      <HoverCardTrigger className="col-span-3">
                        <Input
                          id="congregation"
                          defaultValue="London, Uxbridge"
                          type="text"
                          disabled
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        Your congregation can only be changed by the elders of
                        the congregation you are in.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
