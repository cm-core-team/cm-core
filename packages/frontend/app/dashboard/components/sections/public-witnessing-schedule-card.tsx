"use client";

import React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}

const PublicWitnessingCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Witnessing: </CardTitle>
        <CardDescription>Public Witnessing schedule.</CardDescription>
      </CardHeader>

      {/* Maybe a calendar where people can assign themselves trolleys for? */}

      <CardContent>
        <CalendarDemo />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default PublicWitnessingCard;
