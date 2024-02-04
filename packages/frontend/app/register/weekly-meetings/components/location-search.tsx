"use client";

import React from "react";

import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

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
import { backendRoutes } from "@/lib/config";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import { fetchMeetingsThunk } from "@/lib/stores/thunks/fetch-local-meetings";
import { LocationSearchFormData } from "@/lib/types/location-form";

export function LocationSearch() {
  const form = useForm<LocationSearchFormData>();
  const [locationData, setLocationData] = React.useState<any | never>([]);
  const state = useSelector((state: RootState) => state.localMeetings);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async () => {
    const geoCodingRes = await axios.get(
      `${backendRoutes.user.findLocation}?q=${form.getValues().query}`,
      { headers: { Authorization: sessionStorage.getItem("sessionToken") } },
    );

    console.log(geoCodingRes.data.locations);

    setLocationData([...geoCodingRes.data.locations]);

    // dispatch(
    //   fetchMeetingsThunk({
    //     latitude: String(geoCodingRes.data.lat),
    //     longitude: String(geoCodingRes.data.lon),
    //   }),
    // );
  };

  return (
    <div className="w-full flex flex-col gap-y-3">
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
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {locationData && (
        <div className="w-full h-1/2 overflow-scroll">
          {locationData.map((location: any, i: number) => (
            <Card key={i} className="">
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
                <Button variant="ghost" color="default">
                  Select
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
