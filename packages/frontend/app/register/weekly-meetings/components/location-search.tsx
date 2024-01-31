"use client";

import { useForm } from "react-hook-form";

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
import { LocationSearchFormData } from "@/lib/types/location-form";

export function LocationSearch() {
  const form = useForm<LocationSearchFormData>();

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted!!!");
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
