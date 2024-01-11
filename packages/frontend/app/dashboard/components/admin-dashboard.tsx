/*
Just for now before I can figure out how to programatically generate these
dashboards based on the user type
*/

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  placeholderCongEvents,
  placeholderInformationBoard,
  placeholderDuties,
} from "../../../lib/sample-data";

import AnimateCard from "./animate-card";
import CongEventsCard from "./sections/cong-events-card";
import InformationCard from "./sections/information-card";
import MeetingDutiesCard from "./sections/meeting-duties-card";
import PublicWitnessingCard from "./sections/public-witnessing-schedule-card";
import UserInfoCard from "./sections/user-info-card";
import { DashboardComponentProps, RenderDashboardItem } from "./types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { generateTokenThunk } from "@/lib/stores/thunks/generate-token";
import {
  GenerateTokenFormData,
  generateTokenFormSchema,
} from "@/lib/types/dashboard";

export function AdminDashboard({ currentUser }: DashboardComponentProps) {
  const router = useRouter();

  const renderDashboard = () => {
    const renderDashboardItems: RenderDashboardItem[] = [
      () => (
        <UserInfoCard
          userInfo={{
            name: "John Doe",
            email: "example@gmail.com",
            congregation: "London, Uxbridge",
          }}
        />
      ),
      () => <MeetingDutiesCard data={placeholderDuties} />,
      () => <InformationCard data={placeholderInformationBoard} />,
      () => <CongEventsCard data={placeholderCongEvents} />,
      () => <PublicWitnessingCard />,
    ];

    return (
      <div className="space-y-8">
        {<DashboardToolbar />}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
          {renderDashboardItems.map((renderDashboardItem, i) => (
            <AnimateCard key={i} delay={i / 10}>
              {renderDashboardItem()}
            </AnimateCard>
          ))}
        </div>
      </div>
    );
  };

  const renderLinkCongregation = () => {
    return (
      <Card className="flex flex-col items-center">
        <CardHeader>
          <CardTitle>
            {currentUser.firstName}, you have not yet linked a congregation.{" "}
          </CardTitle>
          <CardDescription>Click below to link a congregation</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.replace("/register/weekly-meetings")}>
            Register a congregation
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {currentUser.congregation ? renderDashboard() : renderLinkCongregation()}
    </div>
  );
}

function DashboardToolbar() {
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<GenerateTokenFormData>({
    resolver: zodResolver(generateTokenFormSchema),
  });
  const state = useSelector((state: RootState) => state.dashboardToolbar);
  const currentUserId = useSelector(
    (state: RootState) => state.dashboard.currentUser?.id,
  );

  const onSubmit = () => {
    if (!currentUserId) {
      return;
    }

    dispatch(
      generateTokenThunk({
        ...form.getValues(),
        createdByUserId: currentUserId,
      }),
    );
  };

  const renderPopoverContent = () => {
    return (
      <Card className="flex flex-col items-center w-full">
        <CardHeader>
          <CardTitle>Generate a Token</CardTitle>
          <CardDescription className="text-center text-xs">
            Generate a token and send it to your invitee.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User email</FormLabel>
                    <FormDescription>The invitee&apos;s email</FormDescription>
                    <FormControl>
                      <Input placeholder="Enter token here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button size="sm" type="submit" className="gap-x-2 flex mx-auto">
                {state.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>
                    Generate Token <KeyRound />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex gap-x-4 justify-end">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" className="gap-x-2">
            <UserPlus />
          </Button>
        </PopoverTrigger>
        <PopoverContent>{renderPopoverContent()}</PopoverContent>
      </Popover>
    </div>
  );
}
