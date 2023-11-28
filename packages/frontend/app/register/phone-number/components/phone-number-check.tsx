"use client";

import { Button } from "@/components/ui/button";
import { Button as NextUIButton } from "@nextui-org/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/lib/stores/store";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export function PhoneNumberCheck() {
  const router = useRouter();
  const selectedCongregation = useSelector(
    (state: RootState) => state.localMeetings.selectedCongregation
  );

  const [selectedPhone, setSelectedPhone] = React.useState<string>();

  if (selectedCongregation === undefined) {
    router.replace("/register");
    return <></>;
  }

  return (
    <div className="grid place-items-center space-y-16">
      <h2 className="text-xl">Confirm your congregation&apos;s phone number</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between">
            {selectedPhone ?? "Select your congregation's phone number"}
            <ChevronsUpDown className="opacity-50 ml-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {selectedCongregation?.phoneNumbers.map((phoneNumber, i) => (
            <DropdownMenuItem
              key={i}
              onSelect={() => setSelectedPhone(phoneNumber.phone)}
            >
              {phoneNumber.phone}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <NextUIButton
        isDisabled={selectedPhone === undefined}
        variant="ghost"
        color="success"
      >
        Next
      </NextUIButton>
    </div>
  );
}
