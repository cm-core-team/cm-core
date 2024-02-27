"use client";

import React from "react";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { motion } from "framer-motion";
import { Locate } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Button as ShadButton } from "@/components/ui/button";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { meetingsSlice } from "@/lib/stores/local-meetings";
import { fetchMeetingsThunk } from "@/lib/stores/thunks/fetch-meetings";
import { getLocationSearchResultsThunk } from "@/lib/stores/thunks/get-location-search-results";
import {
  LocationSearchFormData,
  LocationSearchResult,
} from "@/lib/types/location";

const { updateUserCoords } = meetingsSlice.actions;

export function LocationSearch({
  setUseCurrentLocation,
}: {
  setUseCurrentLocation: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<LocationSearchFormData>();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const state = useSelector((state: RootState) => state.locationSearch);

  React.useEffect(() => {
    getCurrentUser().catch(() => {
      router.replace("/register/user");
    });
  });

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
                latitude: location.geometry.lat,
                longitude: location.geometry.lng,
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

      {state.response && (
        <ScrollArea className="h-96 border-secondary border-2 rounded">
          <motion.div
            className="flex flex-col gap-y-2 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeIn" } }}
            exit={{ opacity: 0 }}
          >
            <big>Select your location</big>
            {renderLocationCards()}
          </motion.div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}
      <hr className="w-1/3" />
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
