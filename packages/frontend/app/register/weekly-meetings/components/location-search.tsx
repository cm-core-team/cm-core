"use client";

import React from "react";

import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";
import { motion } from "framer-motion";
import { Locate } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button as ShadButton } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { meetingsSlice } from "@/lib/stores/local-meetings";
import { LocationSearchState } from "@/lib/stores/location-search";
import { fetchMeetingsThunk } from "@/lib/stores/thunks/fetch-meetings";
import { getLocationSearchResultsThunk } from "@/lib/stores/thunks/get-location-search-results";
import {
  LocationSearchResult,
  LocationSearchFormData,
} from "@/lib/types/location";

const { updateUserCoords } = meetingsSlice.actions;

export function LocationSearch({
  setUseCurrentLocation,
}: {
  setUseCurrentLocation: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<LocationSearchFormData>();
  const dispatch: AppDispatch = useDispatch();

  const state: LocationSearchState = useSelector(
    (state: RootState) => state.locationSearch,
  );

  const onSubmit = async (): Promise<void> => {
    await dispatch(getLocationSearchResultsThunk(form.getValues().query));
  };

  const renderLocationCards = () => {
    if (!state.response) {
      return null;
    }

    return state.response.results.map(
      (location: LocationSearchResult, i: number) => (
        <button
          key={i}
          onClick={() => {
            // Fetch the meetings at the selected location
            dispatch(
              fetchMeetingsThunk({
                latitude: String(location.geometry.lat),
                longitude: String(location.geometry.lng),
              }),
            );
            dispatch(
              updateUserCoords({
                latitude: location.geometry.lat,
                longitude: location.geometry.lng,
              }),
            );
          }}
        >
          <Card key={i} className="hover:bg-secondary-100">
            <CardHeader>
              <h2 className="font-bold">{location.formatted}</h2>
            </CardHeader>
            <CardBody>
              <div>
                <p>{location.city}</p>
                <p>{location.region}</p>
                <p>{location.country}</p>
              </div>
            </CardBody>
          </Card>
        </button>
      ),
    );
  };

  return (
    <div className="grid place-items-center w-full p-4 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-end gap-x-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Look for a location</FormLabel>
                  <FormDescription>Find a specific location</FormDescription>
                  <FormControl>
                    <Input
                      className="sm:w-72 w-full"
                      placeholder="Street name, postcode or city"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <br />

          <ShadButton type="submit" className="flex ml-auto" variant="outline">
            Find
          </ShadButton>
        </form>
      </Form>

      {state.isLoading && (
        <Spinner className="flex mx-auto" label="Finding locations..." />
      )}
      <ScrollArea>
        {state.response && (
          <motion.div
            className="flex flex-col gap-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeIn" } }}
            exit={{ opacity: 0 }}
          >
            <big>Select your location</big>
            {renderLocationCards()}
          </motion.div>
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <big>Or</big>

      <ShadButton
        variant="outline"
        className="gap-x-4"
        onClick={() => {
          setUseCurrentLocation(true);
        }}
      >
        <Locate /> Use current location
      </ShadButton>
    </div>
  );
}
