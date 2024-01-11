"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { backendRoutes } from "@/lib/config";
import { RootState } from "@/lib/stores/app-store";

const linkCongregationFormSchema = z.object({
  token: z.string().min(1, "Please enter the join token."),
});
type LinkCongregationFormData = z.infer<typeof linkCongregationFormSchema>;

export function LinkCongregationForm() {
  const router = useRouter();
  const form = useForm<LinkCongregationFormData>({
    resolver: zodResolver(linkCongregationFormSchema),
  });
  const state = useSelector((state: RootState) => state.dashboard);

  React.useEffect(() => {
    if (!state.currentUser) {
      router.replace("/dashboard");
    }
  }, [state.currentUser, router]);

  const onSubmit = async (data: LinkCongregationFormData) => {
    await axios.post(backendRoutes.user.verifyToken, {
      email: state.currentUser?.email,
      tokenValue: data.token,
    });
  };

  const renderForm = () => {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 sm:w-2/3 p-4 mx-auto w-full lg:w-1/3"
        >
          <div>
            <h1 className="text-2xl font-bold pb-3">
              Enter the join token provided from your Admin
            </h1>
            <small>
              Haven&apos;t received one?{" "}
              <Link href="/register/user" className="hover:underline">
                <strong>Request one</strong>
              </Link>
              .
            </small>
          </div>

          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token Code</FormLabel>
                <FormDescription>
                  The join token sent to you by your Admin.
                </FormDescription>
                <FormControl>
                  <Input placeholder="Enter token here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="flex ml-auto">
            Submit
          </Button>
        </form>
      </Form>
    );
  };

  return <div>{renderForm()}</div>;
}
