"use client";

import { Button as NextUIButton } from "@nextui-org/button";
import { RootState } from "@/lib/stores/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  sendVerificationCode,
  verifyPhone,
} from "@/lib/phone-number/verify-phone";

export function PhoneNumberCheck() {
  const formSchema = z.object({
    phoneNumber: z.string(),
    verificationCode: z.string().length(4),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const selectedCongregation = useSelector(
    (state: RootState) => state.localMeetings.selectedCongregation
  );

  const [didSendCode, setDidSendCode] = React.useState(false);

  if (selectedCongregation === undefined) {
    router.replace("/register");
    return;
  }

  const onSubmit = () => {
    verifyPhone(selectedCongregation, form.getValues().verificationCode);
  };

  return (
    <div className="grid place-items-center space-y-16 p-2">
      <h2 className="text-xl p-2">
        <center>Confirm your congregation&apos;s phone number</center>
      </h2>

      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormDescription>
                  The phone number of your congregation.
                </FormDescription>
                <div className="flex gap-x-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="No selection" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {selectedCongregation?.phoneNumbers.map(
                        (phoneNumber, i) => (
                          <SelectItem value={phoneNumber.phone} key={i}>
                            {phoneNumber.phone}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <NextUIButton
                    isDisabled={!form.getValues().phoneNumber}
                    variant="ghost"
                    color="default"
                    className="text-xs"
                    onClick={() => {
                      sendVerificationCode(selectedCongregation).then(() =>
                        setDidSendCode(true)
                      );
                    }}
                  >
                    Send code
                  </NextUIButton>
                </div>
              </FormItem>
            )}
            name="phoneNumber"
          />

          <FormField
            control={form.control}
            disabled={!didSendCode}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormDescription>
                  Sent to your phone number via SMS
                </FormDescription>
                <Input placeholder="Enter verification code" {...field} />
                <FormMessage />
              </FormItem>
            )}
            name="verificationCode"
          />
          <NextUIButton
            isDisabled={!form.formState.isValid}
            variant="ghost"
            color="success"
            type="submit"
            className="flex ml-auto"
          >
            Next
          </NextUIButton>
        </form>
      </Form>
    </div>
  );
}
