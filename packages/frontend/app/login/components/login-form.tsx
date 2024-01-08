"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

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
import { AppDispatch } from "@/lib/stores/app-store";
import { loginUserThunk } from "@/lib/stores/thunks/login-user";
import {
  LoginUserFormData,
  loginUserFormSchema,
} from "@/lib/types/auth/user-form";

export function LoginForm() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const form = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const onSubmit = async (data: LoginUserFormData) => {
    await dispatch(loginUserThunk({ ...data, router }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 sm:w-2/3 p-4 mx-auto w-full lg:w-1/3"
      >
        <div>
          <h1 className="text-2xl font-bold pb-3">Login</h1>
          <small>
            Don&apos;t have an account?{" "}
            <Link href="/register/user" className="hover:underline">
              <strong>Register</strong>
            </Link>
          </small>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription>
                The email that you signed up with.
              </FormDescription>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>
                Your existing password to log in.
              </FormDescription>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
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
}
