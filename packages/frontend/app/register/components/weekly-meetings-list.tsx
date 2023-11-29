"use client";

import { Congregation } from "@/lib/types/congregation";
import { MeetingCard } from "./meeting-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { DisabledButton } from "@/components/disabled-button";
import { motion } from "framer-motion";

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
    <div className="w-full border-solid border-3 rounded-xl border-spacing-3 shadow-xl shadow-gray-900 sm:p-4 p-2">
      <big className="p-3">Your local Congregations</big>
      <p className="p-3 text-xs">
        Select your congregation from the list below
      </p>
      <DisabledButton className="flex ml-auto">
        <p>
          Selected:{" "}
          {selectedId !== undefined && localCongregations?.length ? (
            localCongregations[selectedId].name
          ) : (
            <span className="text-red-600">No selection</span>
          )}
        </p>
      </DisabledButton>
      <ScrollArea className="md:h-unit-9xl h-unit-7xl">
        <div className="space-y-8">
          {localCongregations ? (
            localCongregations.map((congregation, i) => (
              <MeetingCard
                key={i}
                animationDelay={i}
                isSelected={selectedId === i}
                onSelect={() => {
                  // If the congregation is already selected, unselect
                  if (selectedId == i) {
                    setSelectedId(undefined);
                    setSelectedCongregation(undefined);
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
