"use client";

import { DialogClose } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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


const UserInfoCard = ({ userInfo }: { userInfo: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Info</CardTitle>
        <CardDescription>Everything about you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <span>Name: {userInfo.name}</span>
          <span>Email: {userInfo.email}</span>
          <span>Congregation: {userInfo.congregation}</span>
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
                  defaultValue={userInfo.name}
                  className="col-span-3"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={userInfo.email}
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
                      defaultValue={userInfo.congregation}
                      type="text"
                      disabled
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Your congregation can only be changed by the elders of the
                    congregation you are in.
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default UserInfoCard;
