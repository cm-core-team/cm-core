"use client";

import React from "react";

import { Spinner } from "@nextui-org/spinner";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { MapToggle } from "./map-toggle";
import { MeetingCard } from "./meeting-card";

import { DisabledButton } from "@/components/disabled-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useScreenWidth } from "@/lib/hooks/screen-width";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { localMeetingsSlice } from "@/lib/stores/local-meetings";
import { Congregation } from "@/lib/types/congregation";

export interface WeeklyMeetingsListProps {
  localCongregations?: Congregation[];
}

const { setSelectedCongregation, setDisplayCongregations } =
  localMeetingsSlice.actions;

export function WeeklyMeetingsList() {
  // Selected congregation to create
  const [selectedId, setSelectedId] = React.useState<number>();

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.localMeetings);

  const isFiltered =
    state.displayCongregations.length !== state.localCongregations.length;

  const onMeetingSelect = React.useCallback(
    (i: number) => {
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
            : undefined,
        ),
      );
    },
    [dispatch, selectedId, state.displayCongregations],
  );

  return (
    <div className="w-full border-solid border-3 rounded-xl border-spacing-3 shadow-xl shadow-secondary sm:p-4 p-2">
      {isFiltered ? (
        <FilteredResultsHeader />
      ) : (
        <MainWeeklyMeetingsHeader selectedId={selectedId} />
      )}

      <ScrollArea className="md:h-unit-9xl h-unit-7xl rounded">
        <div className="space-y-8">
          {state.displayCongregations?.length ? (
            state.displayCongregations.map((congregation, i) => (
              <MeetingCard
                key={i}
                animationDelay={i}
                isSelected={selectedId === i}
                onSelect={() => onMeetingSelect(i)}
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

function MainWeeklyMeetingsHeader({ selectedId }: { selectedId?: number }) {
  const { isSmall } = useScreenWidth();
  const state = useSelector((state: RootState) => state.localMeetings);

  return (
    <>
      <div className="flex">
        <big className="p-3">Your Weekly Meetings</big>
        <div className="flex ml-auto justify-end p-3">
          {isSmall && <MapToggle />}
        </div>
      </div>

      <p className="p-3 text-xs">
        Select your congregation from the list below
      </p>
      <DisabledButton className="flex ml-auto">
        <p>
          Selected:{" "}
          {selectedId !== undefined ? (
            state.displayCongregations[selectedId].name
          ) : (
            <span className="text-red-600">No selection</span>
          )}
        </p>
      </DisabledButton>
    </>
  );
}

function FilteredResultsHeader() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.localMeetings);

  return (
    <>
      <span
        className="flex p-3 gap-x-3"
        role="button"
        onClick={() =>
          dispatch(setDisplayCongregations(state.localCongregations))
        }
      >
        <ArrowLeft /> Go back
      </span>
      <p className="opacity-50">
        Results at this location: {state.displayCongregations.length}
      </p>
    </>
  );
}
