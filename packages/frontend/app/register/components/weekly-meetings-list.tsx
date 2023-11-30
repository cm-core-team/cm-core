"use client";

import { Congregation } from "@/lib/types/congregation";
import { MeetingCard } from "./meeting-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { DisabledButton } from "@/components/disabled-button";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { useDispatch, useSelector } from "react-redux";
import { localMeetingsSlice } from "@/lib/stores/local-meetings";

export interface WeeklyMeetingsListProps {
  localCongregations?: Congregation[];
}

const { setSelectedCongregation } = localMeetingsSlice.actions;

export function WeeklyMeetingsList() {
  // Selected congregation to create
  const [selectedId, setSelectedId] = React.useState<number>();

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.localMeetings);

  return (
    <div className="w-full border-solid border-3 rounded-xl border-spacing-3 shadow-xl shadow-secondary sm:p-4 p-2">
      <big className="p-3">Your local Congregations</big>
      <p className="p-3 text-xs">
        Select your congregation from the list below
      </p>
      <DisabledButton className="flex ml-auto">
        <p>
          Selected:{" "}
          {selectedId !== undefined && state.displayCongregations?.length ? (
            state.displayCongregations[selectedId].name
          ) : (
            <span className="text-red-600">No selection</span>
          )}
        </p>
      </DisabledButton>
      <ScrollArea className="md:h-unit-9xl h-unit-7xl rounded">
        <div className="space-y-8">
          {state.displayCongregations?.length ? (
            state.displayCongregations.map((congregation, i) => (
              <MeetingCard
                key={i}
                animationDelay={i}
                isSelected={selectedId === i}
                onSelect={() => {
                  // If the congregation is already selected, unselect
                  if (selectedId == i) {
                    setSelectedId(undefined);
                    dispatch(setSelectedCongregation(undefined));
                    return;
                  }

                  setSelectedId(i);
                  dispatch(
                    setSelectedCongregation(
                      state.displayCongregations
                        ? state.displayCongregations[i]
                        : undefined
                    )
                  );
                }}
                congregation={congregation}
              />
            ))
          ) : (
            <Spinner
              className="flex mx-auto"
              label="Finding your local meetings"
            />
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
