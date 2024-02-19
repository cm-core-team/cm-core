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
import { backendRoutes } from "@/lib/config";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { MeetingsState, meetingsSlice } from "@/lib/stores/local-meetings";
import { fetchMeetingsThunk } from "@/lib/stores/thunks/fetch-meetings";
import { LocationSearchFormData } from "@/lib/types/location-form";

const { updateUserCoords } = meetingsSlice.actions;

export function LocationSearch({
  setUseCurrentLocation,
}: {
  setUseCurrentLocation: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<LocationSearchFormData>();
  const [locationData, setLocationData] = React.useState<any | never>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const state = useSelector((state: RootState) => state.location);

  const onSubmit = async (): Promise<void> => {
    setLocationData([]);
    setIsLoading(true);
    const geoCodingRes = await axios.get(
      `${backendRoutes.user.findLocation}?q=${form.getValues().query}`,
      { headers: { Authorization: sessionStorage.getItem("sessionToken") } },
    );

    setLocationData([...geoCodingRes.data.locations]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-y-3 w-[500px]">
      <div className="flex items-end justify-center gap-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Look for a location...</FormLabel>
                  <FormDescription>Find a specific location</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Street name, postcode or city"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ShadButton
                variant="outline"
                onClick={() => {
                  setUseCurrentLocation(true);
                }}
              >
                <Locate />
              </ShadButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Use your current location</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ScrollArea className="max-h-[500px] h-[400px]">
        {locationData && (
          <motion.div
            className="flex flex-col gap-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeIn" } }}
            exit={{ opacity: 0 }}
          >
            {locationData.map((location: any, i: number) => (
              <Card key={i} className="h-[200px] min-h-[190px]">
                <CardHeader>
                  <h2 className="font-bold">{location.formatted}</h2>
                </CardHeader>
                <CardBody>
                  <div>
                    <p>{location.components.city}</p>
                    <p>{location.components.region}</p>
                    <p>{location.components.country}</p>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    variant="ghost"
                    color="default"
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
                    Select
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </motion.div>
        )}
        {isLoading && (
          <Spinner className="flex mx-auto" label="Finding locations..." />
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
