"use client";

import { Congregation } from "@/lib/types/congregation";
import { MeetingCard } from "./meeting-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@/components/ui/button";

export interface WeeklyMeetingsListProps {
  localCongregations?: Congregation[];
  setSelectedCongregation: React.Dispatch<
    React.SetStateAction<Congregation | undefined>
  >;
}

export function WeeklyMeetingsList({
  localCongregations,
  setSelectedCongregation,
}: WeeklyMeetingsListProps) {
  // Selected congregation to create
  const [selectedId, setSelectedId] = React.useState<number>();
  return (
    <div className="w-3/5 space-y-6 border-solid border-3 rounded-xl p-2">
      <div className="flex">
        <big>Your local congregations</big>
        <Button className="flex ml-auto" disabled variant={"ghost"}>
          {selectedId != undefined && localCongregations ? (
            <>{localCongregations[selectedId].name}</>
          ) : (
            <>No Congregation selected</>
          )}
        </Button>
      </div>
      <ScrollArea className="h-unit-9xl">
        <div className="space-y-2">
          {localCongregations ? (
            localCongregations.map((congregation, i) => (
              <MeetingCard
                key={i}
                isSelected={selectedId === i}
                onSelect={() => {
                  if (selectedId == i) {
                    setSelectedId(undefined);
                    return;
                  }

                  setSelectedId(i);
                  setSelectedCongregation(localCongregations[i]);
                }}
                congregation={congregation}
              />
            ))
          ) : (
            <Spinner className="flex mx-auto" />
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
