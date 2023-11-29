"use client";

import { Congregation } from "@/lib/types/congregation";
import { MeetingCard } from "./meeting-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { DisabledButton } from "@/components/disabled-button";
import { RootState } from "@/lib/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { localMeetingsReducer } from "@/lib/stores/local-meetings";

export interface WeeklyMeetingsListProps {
  localCongregations?: Congregation[];
}

export function WeeklyMeetingsList() {
  // Selected congregation to create
  const [selectedId, setSelectedId] = React.useState<number>();

  const dispatch = useDispatch();
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
          {selectedId !== undefined && state.localCongregations?.length ? (
            state.localCongregations[selectedId].name
          ) : (
            <span className="text-red-600">No selection</span>
          )}
        </p>
      </DisabledButton>
      <ScrollArea className="md:h-unit-9xl h-unit-7xl rounded">
        <div className="space-y-8">
          {state.localCongregations?.length ? (
            state.localCongregations.map((congregation, i) => (
              <MeetingCard
                key={i}
                isSelected={selectedId === i}
                onSelect={() => {
                  // If the congregation is already selected, unselect
                  if (selectedId == i) {
                    setSelectedId(undefined);
                    dispatch(
                      localMeetingsReducer.actions.setSelectedCongregation(
                        undefined
                      )
                    );
                    return;
                  }

                  setSelectedId(i);
                  dispatch(
                    localMeetingsReducer.actions.setSelectedCongregation(
                      state.localCongregations
                        ? state.localCongregations[i]
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
