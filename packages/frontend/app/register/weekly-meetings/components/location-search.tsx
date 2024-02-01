"use client";

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
import { LocationSearchFormData } from "@/lib/types/location-form";

export function LocationSearch() {
  const form = useForm<LocationSearchFormData>();
  const state = useSelector((state: RootState) => state.localMeetings);
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = async () => {
    const res = await axios.get(
      `${backendRoutes.user.findLocation}?q=${form.getValues().query}`,
      { headers: { Authorization: sessionStorage.getItem("sessionToken") } },
    );

    console.log(res.data);
  };

  return (
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
                <Input placeholder="Street name, postcode or city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
