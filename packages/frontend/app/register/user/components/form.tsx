"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  RegisterUserFormData,
  registerUserFormSchema,
} from "@/lib/types/registration/user-form";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { userTypeSchema } from "@/lib/types/user";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/stores/app-store";
import {
  submitUserThunk,
  userRegistrationSlice,
} from "@/lib/stores/register-user";

const { updateUserRegistrationState } = userRegistrationSlice.actions;

export function RegisterForm() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector<RootState>((state) => state.userRegistration);

  const form = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
  });

  const onSubmit = (data: RegisterUserFormData) => {
    dispatch(updateUserRegistrationState(data));
    dispatch(submitUserThunk(data));
    console.log(state);
  };

  return (
    <div className="p-4 mx-auto lg:w-1/3 w-full sm:w-2/3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormDescription>Your first name.</FormDescription>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormDescription>Your last name.</FormDescription>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-x-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription>
                    Email for contact and account.
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <FormDescription>
                    Your role in the congregation.
                  </FormDescription>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {userTypeSchema.options.map((item) => (
                            <SelectItem value={item} key={item}>
                              {item.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormDescription>Create a password.</FormDescription>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="retypedPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retype Password</FormLabel>
                <FormDescription>Re-enter password.</FormDescription>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="flex ml-auto" variant="outline">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
